#include <node.h>
#include <node_buffer.h>
#include <node_version.h>
#include <stdio.h>
#include <stdlib.h>

#include <vips/vips.h>
#include <string.h>
#include <nan.h>

#include "transform.h"

using namespace v8;
using namespace node;
using namespace Nan;

// Macros for checking arguments.
#define REQ_FUN_ARG(I, VAR)                                                 \
    if (info.Length() <= (I) || !info[I]->IsFunction())                     \
        Nan::ThrowTypeError("Argument " #I " must be a function");          \
    Local<Function> VAR = info[I].As<Function>();
#define REQ_NUM_ARG(I, VAR)                                                 \
    if (info.Length() <= (I) || !info[I]->IsNumber())                       \
        Nan::ThrowTypeError("Argument " #I " must be a number");            \
    int VAR = info[I]->ToInt32(Nan::GetCurrentContext()).ToLocalChecked()->Value();
#define REQ_STR_ARG(I, VAR)                                                 \
    if (info.Length() <= (I) || !info[I]->IsString())                       \
        Nan::ThrowTypeError("Argument " #I " must be a string");            \
    Local<String> VAR = info[I]->ToString(Nan::GetCurrentContext()).FromMaybe(v8::Local<v8::String>());
#define REQ_BOOL_ARG(I, VAR)                                                \
    if (info.Length() <= (I) || !info[I]->IsBoolean())                      \
        Nan::ThrowTypeError("Argument " #I " must be a boolean");           \
    bool VAR = info[I]->BooleanValue(Nan::GetCurrentContext()->GetIsolate())
#define REQ_OBJ_ARG(I, VAR)                                                 \
    if (info.Length() <= (I) || !info[I]->IsObject())                       \
        Nan::ThrowTypeError("Argument " #I " must be an object");           \
    Local<Object> VAR = info[I]->ToObject(Nan::GetCurrentContext()).ToLocalChecked();
#define REQ_STR_OR_OBJ_ARG(I)                                           \
    if (info.Length() <= (I) ||                                             \
        !(info[I]->IsString() || info[I]->IsObject()))                      \
        Nan::ThrowTypeError("Argument " #I " must be an object or string"); \

// Data needed for a call to Transform.
// If cols and rows is <= 0, no resizing is done.
// rotate_degrees must be one of 0, 90, 180, or 270.
struct TransformCall {
    transform::Options* op = new transform::Options();
    transform::Thumb* in = new transform::Thumb();
    transform::Thumb* wm = new transform::Thumb();
    transform::Thumb* out = new transform::Thumb();
    std::string err_msg;
};

class PrimeWorker : public AsyncWorker {
    public:
        PrimeWorker(Callback *callback, TransformCall *c)
        : AsyncWorker(callback), c(c) {}

        ~PrimeWorker() {}

        void Execute () {
            transform::Apply(c->in, c->op, c->wm, c->out, &c->err_msg);
            transform::End(&c->err_msg);
        }

        void HandleOKCallback () {
            Nan:: HandleScope scope;

            if (c->in->buffer_len > 0) {
                g_free(c->in->buffer);
            }
            if (c->wm->buffer_len > 0) {
                g_free(c->wm->buffer);
            }

            Local<Value> argv[2];

            if (!c->err_msg.empty()) {
                argv[0] = Nan::Error(c->err_msg.data());
                argv[1] = Nan::Undefined();
            } else {
                argv[0] = Nan::Undefined();
                argv[1] = Nan::CopyBuffer(
                    static_cast<char*>(c->out->buffer),c->out->buffer_len).ToLocalChecked();
                g_free(c->out->buffer);
            }

            Nan::TryCatch try_catch;

            callback->Call(2, argv);

            if (try_catch.HasCaught()) {
                Nan::FatalException(try_catch);
            }
        }
    private:
        TransformCall *c;
};

NAN_METHOD(TransformAsync) {
    Nan::HandleScope scope;

    REQ_STR_OR_OBJ_ARG(0);
    REQ_NUM_ARG(1, width);
    REQ_NUM_ARG(2, height);
    REQ_NUM_ARG(3, quality);
    REQ_BOOL_ARG(4, crop);
    REQ_NUM_ARG(6, rotation);
    REQ_STR_ARG(7, adjust);
    REQ_FUN_ARG(8, cb);
    TransformCall *c = new TransformCall;
    if (info[0]->IsString()) {
        c->in->path = *Nan::Utf8String(info[0]->ToString(Nan::GetCurrentContext()).FromMaybe(v8::Local<v8::String>()));
    } else if (info[0]->IsObject()) {
        Local<Object> buffer_in = info[0]->ToObject(Nan::GetCurrentContext()).ToLocalChecked();
        c->in->buffer_len = Buffer::Length(buffer_in);
        c->in->buffer = g_malloc(c->in->buffer_len);
        memcpy(c->in->buffer, Buffer::Data(buffer_in), c->in->buffer_len);
    }
    c->op->cols = width;
    c->op->rows = height;
    c->op->quality = quality;
    c->op->crop_to_size = crop;
    if (info[5]->IsString()) {
        c->wm->path = *Nan::Utf8String(info[5]->ToString(Nan::GetCurrentContext()).FromMaybe(v8::Local<v8::String>()));
    } else if (info[5]->IsObject()) {
        Local<Object> buffer_wm = info[5]->ToObject(Nan::GetCurrentContext()).ToLocalChecked();
        c->wm->buffer_len = Buffer::Length(buffer_wm);
        c->wm->buffer = g_malloc(c->wm->buffer_len);
        memcpy(c->wm->buffer, Buffer::Data(buffer_wm), c->wm->buffer_len);
    }
    c->op->rotate_degrees = rotation;
    c->op->adjust = *Nan::Utf8String(adjust);
    Nan::Callback *callback = new Nan::Callback(cb);
    Nan::AsyncQueueWorker(new PrimeWorker(callback, c));
}

static void at_exit(void* arg) {
    vips_shutdown();
}

NAN_MODULE_INIT(init) {
    transform::Init("yatm.cc");
    AtExit(at_exit);
    Nan::Set(target, Nan::New("transform").ToLocalChecked(),
        Nan::GetFunction(Nan::New<FunctionTemplate>(TransformAsync)).ToLocalChecked());
}

NODE_MODULE(yatm, init)

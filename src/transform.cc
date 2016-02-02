#include <string.h>

#include "transform.h"
#include "image.h"

using std::string;
using image::Type;
using image::Image;

namespace transform {

    bool ContainsPath(Thumb* in) {
        return !(in->path.empty());
    }

    bool ContainsBuffer(Thumb* in) {
        return in->buffer_len > 0;
    }

    Type GetType(Thumb* in) {
        Type type = Type::UNKNOWN;
        if (ContainsBuffer(in)) {
            type = image::GetType(in->buffer, in->buffer_len);
        } else if (ContainsPath(in)) {
            type = image::GetType(in->path.c_str());
        }
        return type;
    }

    bool Validate(Type type, int cols, int rows, string* error) {
        if (!image::IsValid(type)) {
            error->assign("Image not found or invalid type.");
            return false;
        }

        if (cols <= 0 && rows <= 0) {
            error->assign("Invalid width and height.");
            return false;
        }
        return true;
    }

    Image* InitializeImage(Thumb* in) {
        Image *thumb;
        if (ContainsPath(in)) {
            thumb = image::Init(in->path.c_str());
        }  else if (ContainsBuffer(in)) {
            thumb = image::Init(in->buffer, in->buffer_len);
        } else {
            thumb = NULL;
        }
        return thumb;
    }

    int Apply(Thumb* in, Options* options, Thumb* watermark,
              Thumb* out, std::string* error) {

        Type type = GetType(in);
        if (!Validate(type, options->cols, options->rows, error)) {
            return -1;
        }

        Image *thumb, *wm;
        thumb = InitializeImage(in);
        thumb = image::Rotate(thumb, options->rotate_degrees);
        thumb = image::Resize(thumb, options->cols, options->rows, options->crop_to_size, options->adjust.c_str());
        if (options->crop_to_size) {
            thumb = image::Crop(thumb, options->cols, options->rows);
        }
        if (image::IsValid(GetType(watermark))) {
            wm = InitializeImage(watermark);
            thumb = image::Watermark(thumb, wm);
        }
        return image::Create(thumb, &out->buffer, &out->buffer_len, options->quality, type);
    }

    void Init(const char* argv0) {
        image::Prepare(argv0);
    }

    void End(string* error) {
        image::GetError(error);
        image::Exit();
    }
}

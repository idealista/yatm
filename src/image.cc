#include <math.h>
#include <string.h>
#include <assert.h>

#include "image.h"

namespace image {

    static const double TRANSPARENCY = 0.75;

    static int CalculateShrink(int width, int height, int new_width, int new_height,
                                const char *adjust, int crop_to_size, double *residual) {
        double xf = static_cast<double>(width) / std::max(new_width, 1);
        double yf = static_cast<double>(height) / std::max(new_height, 1);
        double factor;
        if (crop_to_size) {
            factor = std::min(yf, xf);
        } else {
            factor = (strcmp(adjust,"he") == 0) ? yf : xf;
        }
        factor = std::max(factor, 1.0);
        int shrink = floor(factor);

        if (residual != NULL) {
            *residual = shrink / factor;
        }

        return shrink;
    }

    static double CalculateScale(int width, int height, int new_width, int new_height,
                                  const char *adjust, int crop_to_size) {
        double xf = static_cast<double>(new_width) / width;
        double yf = static_cast<double>(new_height) / height;
        double factor;
        if (crop_to_size) {
            factor = std::max(yf, xf);
        } else {
            factor = (strcmp(adjust,"he") == 0) ? yf : xf;
        }
        return factor;
    }

    static VipsAngle ToAngle(int degrees) {
        VipsAngle angle = VIPS_ANGLE_D0;
        switch (degrees) {
            case 90:
                angle = VIPS_ANGLE_D90;
                break;
            case 180:
                angle = VIPS_ANGLE_D180;
                break;
            case 270:
                angle = VIPS_ANGLE_D270;
                break;
            default:
            break;
        }
        return angle;
    }

    static bool EndsWith(std::string const &str, std::string const &end) {
        return str.length() >= end.length() &&
               0 == str.compare(str.length() - end.length(), end.length(), end);
    }

    void RemoveImage(Image *in) {
        g_object_unref(in->img);
        delete in;
    }

    Image* CreateImage(VipsImage *in) {
        Image *thumb = new Image;
        thumb->img = in;
        return thumb;
    }

    void Prepare(char const *argv) {
        assert(vips_init(argv) == 0);
        vips_cache_set_max(0);
    }

    void Exit() {
        vips_thread_shutdown();
    }

    Image* Init(void *buffer, size_t const length) {
        Image *thumb = NULL;
        VipsImage *out = vips_image_new_from_buffer(buffer, length, "", "access", VIPS_ACCESS_RANDOM, NULL);
        if (out != NULL) {
            thumb = new Image;
            thumb->img = out;
        }
        return thumb;
    }

    Image* Init(char const *path) {
        Image *thumb = NULL;
        VipsImage *out =  vips_image_new_from_file(path, "access", VIPS_ACCESS_RANDOM, NULL);
        if (out != NULL) {
            thumb = new Image;
            thumb->img = out;
        }
        return thumb;
    }

    Type GetType(void *buffer, size_t const length) {
        Type imageType = Type::UNKNOWN;
        char const *load = vips_foreign_find_load_buffer(buffer, length);
        if (load != NULL) {
            std::string loader = load;
            if (EndsWith(loader, "JpegBuffer")) {
                imageType = Type::JPEG;
            } else if (EndsWith(loader, "PngBuffer")) {
                imageType = Type::PNG;
            } else if (EndsWith(loader, "MagickBuffer") || EndsWith(loader, "gifBuffer")) {
                imageType = Type::GIF;
            } else if (EndsWith(loader, "TiffBuffer")) {
                imageType = Type::TIFF;
            } else if (EndsWith(loader, "WebpBuffer")) {
                imageType = Type::WEBP;
            } else {
                imageType = Type::UNSUPPORTED;
            }
        }
        return imageType;
    }

    Type GetType(char const *file) {
        Type imageType = Type::UNKNOWN;
        char const *load = vips_foreign_find_load(file);
        if (load != NULL) {
            std::string loader = load;
            if (EndsWith(loader, "JpegFile")) {
                imageType = Type::JPEG;
            } else if (EndsWith(loader, "PngFile") || EndsWith(loader, "Png")) {
                imageType = Type::PNG;
            } else if (EndsWith(loader, "Magick") || EndsWith(loader, "MagickFile") || EndsWith(loader, "gifFile")) {
                imageType = Type::GIF;
            } else if (EndsWith(loader, "TiffFile")) {
                imageType = Type::TIFF;
            } else if (EndsWith(loader, "WebpFile")) {
                imageType = Type::WEBP;
            } else {
                imageType = Type::UNSUPPORTED;
            }
        }
        return imageType;
    }

    void GetError(std::string* out) {
        out->append(vips_error_buffer());
        vips_error_clear();
        return;
    }

    bool IsValid(Type type) {
        if (type == Type::UNKNOWN ||
            type == Type::UNSUPPORTED) {
            return false;
        }
        return true;
    }

    Image* Watermark(Image *in, Image *wm) {
        if (in == NULL || in->img == NULL || wm == NULL || wm->img == NULL) return NULL;

        VipsImage *invert, *embed, *linear, *out;

        vips_invert(wm->img, &invert, NULL);
        vips_embed(invert, &embed, in->img->Xsize/2 - wm->img->Xsize/2, in->img->Ysize/2 - wm->img->Ysize/2,
                   in->img->Xsize, in->img->Ysize, "extend", VIPS_EXTEND_BLACK, NULL);
        vips_linear1(in->img, &linear, TRANSPARENCY, 0, NULL);
        vips_ifthenelse(embed, linear, in->img, &out, 0, 0, NULL);

        g_object_unref(invert);
        g_object_unref(embed);
        g_object_unref(linear);
        RemoveImage(in);
        RemoveImage(wm);
        Image *thumb = CreateImage(out);
        return thumb;
    }

    Image* Crop(Image *in, int cols, int rows) {
        if (in == NULL || in->img == NULL) return NULL;

        VipsImage *out;

        if (cols <= 0 || rows <= 0) {
            vips_copy(in->img, &out, NULL);
        } else {
            int left = (in->img->Xsize - cols) / 2;
            int top = (in->img->Ysize - rows) / 2;
            vips_crop(in->img, &out, left, top, std::min(cols,in->img->Xsize),
                      std::min(rows,in->img->Ysize), NULL);
        }
        RemoveImage(in);
        Image *thumb = CreateImage(out);
        return thumb;
    }

    Image* Resize(Image *in, int cols, int rows, bool crop_to_size, char const *adjust) {
        if (in == NULL || in->img == NULL) return NULL;

        VipsImage *out;

        if ((strcmp(adjust,"wi") == 0 && cols <= in->img->Xsize && !crop_to_size) ||
            (strcmp(adjust,"he") == 0 && rows <= in->img->Ysize && !crop_to_size) ||
            (crop_to_size && cols <= in->img->Xsize && rows <= in->img->Ysize)) {
            VipsImage *shrinked;
            double residual;
            int shrink = CalculateShrink(in->img->Xsize, in->img->Ysize, cols, rows, adjust, crop_to_size, &residual);
            vips_shrink(in->img, &shrinked, shrink, shrink, NULL);
            vips_affine(shrinked, &out, residual, 0, 0, residual, NULL);
            g_object_unref(shrinked);
        } else {
            double scale = CalculateScale(in->img->Xsize, in->img->Ysize, cols, rows, adjust,crop_to_size);
            vips_similarity(in->img, &out, "scale", scale, NULL);
        }
        RemoveImage(in);
        Image *thumb = CreateImage(out);
        return thumb;
    }

    Image* Rotate(Image *in, int degrees) {
        if (in == NULL || in->img == NULL) return NULL;

        VipsImage *out;
        VipsAngle angle = ToAngle(degrees);
        vips_rot(in->img, &out, angle, NULL);
        RemoveImage(in);
        Image *thumb = CreateImage(out);
        return thumb;
    }

    int Create(Image *in, void** buf, size_t *len, int quality, Type type) {
        int result = 0;
        if (type == Type::PNG) {
            result = vips_pngsave_buffer(in->img, buf, len, NULL);
        } else {
            result = vips_jpegsave_buffer(in->img, buf, len, "Q", quality, "strip", TRUE, NULL);
        }
        RemoveImage(in);
        return result;
    }
}

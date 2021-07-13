#ifndef NODE_VIPS_IMAGE_H__
#define NODE_VIPS_IMAGE_H__

#include <vips/vips.h>
#include <string>

namespace image {

    struct Image {
        VipsImage* img;
    };

    enum class Type {
        UNSUPPORTED,
        UNKNOWN,
        JPEG,
        PNG,
        GIF,
        TIFF,
        WEBP
    };

    void Prepare(char const *argv);

    void Exit();

    // Init: Initialise and return a Image from a buffer.
    Image* Init(void *buffer, size_t const length);

    // Init: Initialise and return a Image from a file.
    Image* Init(char const *path);

    // GetType: Determine image format of a buffer.
    Type GetType(void *buffer, size_t const length);

    // GetType: Determine image format, reads the first few bytes of the file
    Type GetType(char const *file);

    void GetError(std::string* out);

    bool IsValid(Type type);

    Image* Watermark(Image *in, Image *wm);

    Image* Crop(Image *in, int cols, int rows);

    Image* Resize(Image *in, int cols, int rows, bool crop_to_size, char const *adjust);

    Image* Rotate(Image *in, int degrees);

    int Create(Image *in, void** buf, size_t *len2, int quality, Type type);

}

#endif  // NODE_VIPS_IMAGE_H__

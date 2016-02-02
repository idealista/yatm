#ifndef NODE_VIPS_TRANSFORM_H__
#define NODE_VIPS_TRANSFORM_H__

#include <string>

namespace transform {

    // Data needed for a call to Transform.
    // If cols and rows is <= 0, no resizing is done.
    // rotate_degrees must be one of 0, 90, 180, or 270.
    struct Options {
        int  cols;              // resize to this many columns
        int  rows;              // and this many rows
        int  quality;
        bool crop_to_size;
        int  rotate_degrees;    // rotate image by this many degrees
        std::string adjust;

        Options() :
            cols(-1), rows(-1), quality(-1), crop_to_size(false),
            rotate_degrees(0) {}
    };

    struct Thumb {
        std::string path;
        void* buffer;
        size_t buffer_len;

        Thumb() :
            buffer_len(0){}
    };
    // Apply: resize and/or rotate an image and/or watermark it.
    //
    // If 'cols' or 'rows' is < 0, no resizing is done.  Otherwise, the image is
    // scaled down such that the aspect ratio is preserved.  If 'crop_to_size' is
    // true, the resulting image will be the exact size of cols x rows (assuming
    // it was larger than that), and the image will be cropped to reach it.
    // If 'crop_to_size' is false, it is just scaled down such that the resulting
    // image will fit into the cols x rows.
    //
    // 'rotate_degrees' must be one of 0, 90, 180, or 270.
    //
    // If 'auto_orient' is true, the orientation is read from EXIF data on the
    // image, and it is rotated to be right side up, and an orientation of '1'
    // is written back to the EXIF.
    //
    // Return 0 on success, < 0 if an error and fill in 'error'.
    int Apply(Thumb* in, Options* options, Thumb* watermark,
              Thumb* out, std::string* error);

    // Must be called once before Apply.
    void Init(const char* argv0);

    // Must be called once after Apply
    void End(std::string* error);
}

#endif  // NODE_VIPS_TRANSFORM_H__

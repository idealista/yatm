{
    'targets': [{
        'target_name': 'thumbnailer',
        'sources': [
            'src/thumbnailer.cc',
            'src/image.cc',
            'src/transform.cc'
        ],
        'include_dirs': [
            '<!(node -e "require(\'nan\')")'
            ],
        'conditions': [
            ['OS=="mac"', {
                'libraries': [
                    '<!@(PKG_CONFIG_PATH=/usr/local/Library/ENV/pkgconfig/10.8 pkg-config --libs glib-2.0 vips exiv2)',
                ],
                'include_dirs': [
                  '/usr/local/include/glib-2.0',
                  '/usr/local/include/vips',
                  '/usr/local/include/exiv2',
                  '/usr/local/lib/glib-2.0/include',
                  '/usr/local/lib'
                ]
            }, {
                'libraries': [
                    '<!@(PKG_CONFIG_PATH="/usr/local/lib/pkgconfig:$PKG_CONFIG_PATH" pkg-config --libs glib-2.0 vips exiv2)'
                ],
                'include_dirs': [
                    '/usr/include/glib-2.0',
                    '/usr/lib/glib-2.0/include',
                    '/usr/lib/x86_64-linux-gnu/glib-2.0/include',
                    '/usr/local/lib',
                    '/usr/lib64/glib-2.0/include'
                ],
                'cflags+': [ '-fopenmp' ],
                'cflags_cc+': ['-fopenmp' ]
            }]
        ],
        'cflags': [ '-fexceptions', '-std=c++11' ],
        'cflags_cc': [ '-fexceptions', '-std=c++11' ]
    }]
}

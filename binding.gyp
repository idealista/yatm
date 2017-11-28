{
    'targets': [{
        'target_name': 'yatm',
        'sources': [
            'src/yatm.cc',
            'src/image.cc',
            'src/transform.cc'
        ],
        'include_dirs': [
            '<!(node -e "require(\'nan\')")',
            'deps/include/glib-2.0',
            'deps/include',
            'deps/lib/glib-2.0/include'
        ],
        'libraries': [
            '../deps/lib/libvips-cpp.so',
            '../deps/lib/libvips.so',
            '-Wl,-rpath=\'$${ORIGIN}/../../deps/lib\''
        ],
        'defines': [
            '_GLIBCXX_USE_CXX11_ABI=0'
        ],
        'cflags_cc': [
            '-fexceptions',
            '-std=c++0x',
            '-Wall',
            '-O3'
        ]
    }]
}

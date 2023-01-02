const mockDate = () => {
    return {
        toDate(){return new Date()},
    }
}

export default {
    notifications: {
        'user-1': {
            unread_count: 0,
            comics: {
                'notification-1': {
                    chapter: {
                        id: 'chapter-1',
                        path: 'comics/comic-1/chapters/chapter-1',
                    },
                    comic: {
                        id: 'comic-1',
                        path: 'comics/comic-1',
                    },
                    created_date: mockDate(),
                    unread: true,
                },
                'notification-2': {
                    chapter: {
                        id: 'chapter-1',
                        path: 'comics/comic-1/chapters/chapter-1',
                    },
                    comic: {
                        id: 'comic-1',
                        path: 'comics/comic-1',
                    },
                    created_date: mockDate(),
                    unread: true,
                },
            }
        }
    },
    settings: {
        banners: {
            value: [
                {
                    async_component: "video-banner",
                    target: "SSb0da8HXyie7DbcAEve",
                    target_type: "Comic",
                    title: "Kara",
                    type: "component"
                },
                {
                    async_component: "banner-form-2",
                    target: "SSb0da8HXyie7DbcAEve",
                    target_type: "Comic",
                    title: "Kara",
                    type: "component"
                },
                {
                    async_component: "banner-form-3",
                    target: "SSb0da8HXyie7DbcAEve",
                    target_type: "Comic",
                    title: "Kara",
                    type: "component"
                },
                {
                    async_component: "async-component-test",
                    target: "SSb0da8HXyie7DbcAEve",
                    target_type: "Comic",
                    title: "Kara",
                    type: "component"
                },
            ]
        }
    },
    async_components: {
        'video-banner': {
            data: '()=>({videoSrc:"https://firebasestorage.googleapis.com/v0/b/comics-77200.appspot.com/o/videos%2Fdashboard%2Ftest-compressed.mp4?alt=media&token=4d7a6536-0203-4698-ba2a-3cbed199b965",imgSrc:"https://firebasestorage.googleapis.com/v0/b/comics-77200.appspot.com/o/logos%2Fkara_logo.png?alt=media&token=7060c54a-8c85-4131-8f88-8a6c7ac84200"})',
            name: 'video-banner',
            template: '<div id="async-banner" class="flex w-full h-full"><video playsinline autoplay muted loop v-show="videoSrc" :src="videoSrc" class="absolute w-full h-full object-cover"></video><div class="w-full h-full bg-black/50 items-center justify-center z-20 flex text-white"><img v-show="imgSrc" :src="imgSrc"></div></div>'
        },
        'banner-form-2': {
            data: '()=>({videoSrc:"https://firebasestorage.googleapis.com/v0/b/comics-77200.appspot.com/o/videos%2Fdashboard%2Ftest-compressed.mp4?alt=media&token=4d7a6536-0203-4698-ba2a-3cbed199b965",imgSrc:"https://firebasestorage.googleapis.com/v0/b/comics-77200.appspot.com/o/logos%2Fkara_logo.png?alt=media&token=7060c54a-8c85-4131-8f88-8a6c7ac84200"})',
            created: 'created(){console.log("test")}',
            mounted: 'mounted(){console.log("mounted")}',
            name: 'video-banner',
            template: '<div id="async-banner" class="flex w-full h-full"><video playsinline autoplay muted loop v-show="videoSrc" :src="videoSrc" class="absolute w-full h-full object-cover"></video><div class="w-full h-full bg-black/50 items-center justify-center z-20 flex text-white"><img v-show="imgSrc" :src="imgSrc"></div></div>'
        },
        'banner-form-3': {
            data: '()=>({videoSrc:"https://firebasestorage.googleapis.com/v0/b/comics-77200.appspot.com/o/videos%2Fdashboard%2Ftest-compressed.mp4?alt=media&token=4d7a6536-0203-4698-ba2a-3cbed199b965",imgSrc:"https://firebasestorage.googleapis.com/v0/b/comics-77200.appspot.com/o/logos%2Fkara_logo.png?alt=media&token=7060c54a-8c85-4131-8f88-8a6c7ac84200"})',
            created: '()=>{console.log("testb")}',
            mounted: '()=>{console.log("mountedb")}',
            name: 'video-banner',
            template: '<div id="async-banner" class="flex w-full h-full"><video playsinline autoplay muted loop v-show="videoSrc" :src="videoSrc" class="absolute w-full h-full object-cover"></video><div class="w-full h-full bg-black/50 items-center justify-center z-20 flex text-white"><img v-show="imgSrc" :src="imgSrc"></div></div>'
        },
        'async-component-test': {
            name: 'test-async-component',
            props: '({"test":{"default":"","type":String}})',
            methods: '({test(){console.log("test")}})',
            created: 'created(){console.log("test-created");[1,2,3].forEach(console.log)}',
            mounted: 'mounted(){console.log("test-mounted");[1,2,3].forEach(console.log)}',
            template: '<div></div>'
        }
    },
    comics: {
        'comic-1': {
            id: 'comic-1',
            authors_data: [
                {
                    name: 'Diego Erdman',
                    id: 'author-1',
                    profile_picture_url: 'gs://comics-77200.appspot.com/alan_moore.jpg'
                },
            ],
            is_draft: false,
            favorite_count: 3,
            description: 'Eligendi sed amet eum odit qui voluptas. Possimus voluptatibus nemo minus sapiente rerum delectus. Odit occaecati voluptates quos. Aperiam quasi voluptatem itaque voluptatem beatae. Sint occaecati eius enim aut rerum quaerat.',
            release_date: mockDate(),
            view_count: 3,
            last_update: mockDate(),
            price: 100,
            cover_image_url: 'gs://comics-77200.appspot.com/cpt-prev.jpg',
            tags: ['horror', 'scifi'],
            authors: [
                {
                    id: 'author-1',
                },
            ],
            keywords: [
                'diego', 'erdman',
                'casandra', 'upton',
                'horror', 'scifi',
                'hard', 'drive',
                '2000'
            ],
            title: 'hard drive 2000',
            categories: ['horror', 'scifi'],
            chapters: {
                'chapter-1': {
                    id: 'chapter-1',
                    ar_price: false,
                    chapter_number: 1,
                    chapter_preview_url: "gs://comics-77200.appspot.com/previews/cpt1_preview.jpeg",
                    price: 1,
                    release_date: mockDate(),
                    view_count: 0,
                    pages: {
                        'page-1': {
                            is_ar: false,
                            media_type: "image",
                            page_image_url: "gs://comics-77200.appspot.com/comics/SSb0da8HXyie7DbcAEve/web_comic_1.jpg",
                            page_number: 0
                        },
                        'page-2': {
                            is_ar: false,
                            media_type: "video",
                            page_image_url: "gs://comics-77200.appspot.com/comics/SSb0da8HXyie7DbcAEve/web_comic_4.mp4",
                            page_number: 1
                        },
                        'page-3': {
                            is_ar: false,
                            media_type: "video",
                            page_image_url: "gs://comics-77200.appspot.com/comics/SSb0da8HXyie7DbcAEve/web_comic_4.mp4",
                            page_number: 2
                        },
                    },
                    counters: {
                        '0': {view_count: 0},
                        '1': {view_count: 0},
                        '2': {view_count: 0},
                        '3': {view_count: 0},
                        '4': {view_count: 0},
                        '5': {view_count: 0},
                        '6': {view_count: 0},
                        '7': {view_count: 0},
                        '8': {view_count: 0},
                        '9': {view_count: 0},
                    }
                },
                'chapter-2': {
                    id: 'chapter-2',
                    ar_price: false,
                    chapter_number: 2,
                    chapter_preview_url: "gs://comics-77200.appspot.com/previews/cpt1_preview.jpeg",
                    price: 1,
                    release_date: mockDate(),
                    view_count: 0,
                    pages: {
                        'page-1': {
                            is_ar: false,
                            media_type: "image",
                            page_image_url: "gs://comics-77200.appspot.com/comics/SSb0da8HXyie7DbcAEve/web_comic_1.jpg",
                            page_number: 0
                        },
                        'page-2': {
                            is_ar: false,
                            media_type: "video",
                            page_image_url: "gs://comics-77200.appspot.com/comics/SSb0da8HXyie7DbcAEve/web_comic_4.mp4",
                            page_number: 1
                        },
                    },
                    counters: {
                        '0': {view_count: 0},
                        '1': {view_count: 0},
                        '2': {view_count: 0},
                        '3': {view_count: 0},
                        '4': {view_count: 0},
                        '5': {view_count: 0},
                        '6': {view_count: 0},
                        '7': {view_count: 0},
                        '8': {view_count: 0},
                        '9': {view_count: 0},
                    }
                }
            },
            chapters_data: [
                {
                    view_count: 2,
                    price: 1,
                    release_date: mockDate(),
                    chapter_number: 1,
                    id: 'chapter-1',
                    chapter_preview_url: 'gs://comics-77200.appspot.com/cpt-prev.jpg'
                },
                {
                    chapter_preview_url: 'gs://comics-77200.appspot.com/cpt-prev.jpg',
                    price: 1,
                    chapter_number: 2,
                    id: 'chapter-2',
                    release_date: mockDate(),
                    view_count: 2
                },
            ],
            comments: {
                'comment-1': {
                    created_date: mockDate(),
                    date: mockDate(),
                    flag: 0,
                    message: 'testing',
                    user: 'user-1',
                    user_data: {
                        id: 'user-1',
                        name: 'ppramesii',
                        profile_image_url: 'gs://comics-77200.appspot.com/uploads/profile_images/hslN0mmWdxUFuAn3R4xd8gvlgLk2/alan_moore.jpg',
                    }
                },
                'comment-2': {
                    created_date: mockDate(),
                    date: mockDate(),
                    flag: 0,
                    message: 'testing',
                    user: 'user-1',
                    user_data: {
                        id: 'user-1',
                        name: 'ppramesii',
                        profile_image_url: 'gs://comics-77200.appspot.com/uploads/profile_images/hslN0mmWdxUFuAn3R4xd8gvlgLk2/alan_moore.jpg',
                    }
                }
            },
            counters: {
                '0': {view_count: 0},
                '1': {view_count: 0},
                '2': {view_count: 0},
                '3': {view_count: 0},
                '4': {view_count: 0},
                '5': {view_count: 0},
                '6': {view_count: 0},
                '7': {view_count: 0},
                '8': {view_count: 0},
                '9': {view_count: 0},
            }
        },
        'comic-2': {
            id: 'comic-2',
            is_draft: false,
            categories: ['superhero', 'fantasy'],
            title: 'circuit',
            cover_image_url: 'gs://comics-77200.appspot.com/cpt-prev.jpg',
            price: 100,
            release_date: mockDate(),
            description: 'Soluta enim explicabo nostrum distinctio. Atque et amet molestiae voluptates. Quo vitae dicta ex voluptas. Quia fuga quia voluptatibus cum non itaque autem. Consequatur fugiat ullam minima velit ex. Voluptate exercitationem facere consequatur minus optio. Ut eos magni deserunt voluptatem nobis qui qui saepe numquam. Minus alias earum rem in eos aut veritatis magnam.',
            last_update: mockDate(),
            favorite_count: 1,
            authors: [
                {
                    id: 'author-2',
                },
            ],
            tags: ['superhero', 'fantasy'],
            authors_data: [
                {
                    id: 'author-2',
                    profile_picture_url: 'gs://comics-77200.appspot.com/alan_moore.jpg',
                    name: 'Lavada Veum'
                },
            ],
            view_count: 3,
            keywords: [
                'lavada',
                'veum',
                'casandra',
                'upton',
                'superhero',
                'fantasy',
                'circuit'
            ],
            chapters: {
                'cmc-2-chapter-1': {
                    id: 'cmc-2-chapter-1',
                    ar_price: false,
                    chapter_number: 1,
                    chapter_preview_url: "gs://comics-77200.appspot.com/previews/cpt1_preview.jpeg",
                    price: 1,
                    release_date: mockDate(),
                    view_count: 0,
                    pages: {
                        'cmc-2-cpt-1-page-1': {
                            is_ar: false,
                            media_type: "image",
                            page_image_url: "gs://comics-77200.appspot.com/comics/SSb0da8HXyie7DbcAEve/web_comic_1.jpg",
                            page_number: 0
                        },
                        'cmc-2-cpt-1-page-2': {
                            is_ar: false,
                            media_type: "video",
                            page_image_url: "gs://comics-77200.appspot.com/comics/SSb0da8HXyie7DbcAEve/web_comic_4.mp4",
                            page_number: 1
                        },
                        'cmc-2-cpt-1-page-3': {
                            is_ar: false,
                            media_type: "video",
                            page_image_url: "gs://comics-77200.appspot.com/comics/SSb0da8HXyie7DbcAEve/web_comic_4.mp4",
                            page_number: 2
                        },
                    },
                    counters: {
                        '0': {view_count: 0},
                        '1': {view_count: 0},
                        '2': {view_count: 0},
                        '3': {view_count: 0},
                        '4': {view_count: 0},
                        '5': {view_count: 0},
                        '6': {view_count: 0},
                        '7': {view_count: 0},
                        '8': {view_count: 0},
                        '9': {view_count: 0},
                    }
                },
                'cmc-2-chapter-2': {
                    id: 'cmc-2-chapter-2',
                    ar_price: false,
                    chapter_number: 2,
                    chapter_preview_url: "gs://comics-77200.appspot.com/previews/cpt1_preview.jpeg",
                    price: 1,
                    release_date: mockDate(),
                    view_count: 0,
                    pages: {
                        'cmc-2-cpt-2-page-1': {
                            is_ar: false,
                            media_type: "image",
                            page_image_url: "gs://comics-77200.appspot.com/comics/SSb0da8HXyie7DbcAEve/web_comic_1.jpg",
                            page_number: 0
                        },
                        'cmc-2-cpt-2-page-2': {
                            is_ar: false,
                            media_type: "video",
                            page_image_url: "gs://comics-77200.appspot.com/comics/SSb0da8HXyie7DbcAEve/web_comic_4.mp4",
                            page_number: 1
                        },
                    },
                    counters: {
                        '0': {view_count: 0},
                        '1': {view_count: 0},
                        '2': {view_count: 0},
                        '3': {view_count: 0},
                        '4': {view_count: 0},
                        '5': {view_count: 0},
                        '6': {view_count: 0},
                        '7': {view_count: 0},
                        '8': {view_count: 0},
                        '9': {view_count: 0},
                    }
                }
            },
            chapters_data: [
                {
                    view_count: 2,
                    price: 1,
                    release_date: mockDate(),
                    chapter_number: 1,
                    id: 'cmc-2-chapter-1',
                    chapter_preview_url: 'gs://comics-77200.appspot.com/cpt-prev.jpg'
                },
                {
                    chapter_preview_url: 'gs://comics-77200.appspot.com/cpt-prev.jpg',
                    price: 1,
                    chapter_number: 2,
                    id: 'cmc-2-chapter-2',
                    release_date: mockDate(),
                    view_count: 2
                },
            ],
            comments: {
                'comment-3': {
                    created_date: mockDate(),
                    date: mockDate(),
                    flag: 0,
                    message: 'testing asdf',
                    user: 'user-1',
                    user_data: {
                        id: 'user-1',
                        name: 'ppramesii',
                        profile_image_url: 'gs://comics-77200.appspot.com/uploads/profile_images/hslN0mmWdxUFuAn3R4xd8gvlgLk2/alan_moore.jpg',
                    }
                },
                'comment-4': {
                    created_date: mockDate(),
                    date: mockDate(),
                    flag: 0,
                    message: 'testing asdf',
                    user: 'user-1',
                    user_data: {
                        id: 'user-1',
                        name: 'ppramesii',
                        profile_image_url: 'gs://comics-77200.appspot.com/uploads/profile_images/hslN0mmWdxUFuAn3R4xd8gvlgLk2/alan_moore.jpg',
                    }
                }
            },
            counters: {
                '0': {view_count: 0},
                '1': {view_count: 0},
                '2': {view_count: 0},
                '3': {view_count: 0},
                '4': {view_count: 0},
                '5': {view_count: 0},
                '6': {view_count: 0},
                '7': {view_count: 0},
                '8': {view_count: 0},
                '9': {view_count: 0},
            }
        }
    },
    authors: {
        'author-1': {
            description: 'He is the writer of Kara, Guardian of Realms. He has been writing for 10 years.',
            social_media_links: { facebook: 'https://facebook.com', twitter: 'https://twitter.com' },
            email: 'author1@mail.com',
            name: 'Andra Fembriarto',
            user_id: null,
            profile_picture_url: 'gs://comics-77200.appspot.com/uploads/profile_images/hslN0mmWdxUFuAn3R4xd8gvlgLk2/fembriarto.jpg'
        },
        'author-2': {
            description: 'He is the writer of Kara, Guardian of Realms. He has been writing for 10 years.',
            social_media_links: { facebook: 'https://facebook.com', twitter: 'https://twitter.com' },
            email: 'author2@mail.com',
            name: 'Andra Fembriarto',
            user_id: null
        }
    },
    users: {
        'user-1': {
            comic_subscriptions: [],
            email_verified_at: null,
            profile_image_url: 'gs://comics-77200.appspot.com/uploads/profile_images/hslN0mmWdxUFuAn3R4xd8gvlgLk2/alan_moore.jpg',
            name: 'ppramesii',
            bookmarks: [],
            email: 'ppramesi@visi8.com',
            full_name: 'ppramesi',
            favorites: []
        }
    },
    categories: {
        'category-1': {
            name: 'World'
        }
    },
    tags: {
        'tag-1': {
            name: 'folk'
        }
    },
    user_roles: {
        'user-1': {
            roles: ['user']
        }
    }
}
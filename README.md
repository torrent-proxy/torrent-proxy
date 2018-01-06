# torrent-proxy

API предоставляющее возможность скачивать торренты там, где это не возможно из-за ограничений платформы или провайдера.

## Фунцкционал:

- [x] Скачивать торренты по magnet-ссылке отдаваю ссылку на файл/директорию
- [x] Осуществлять поиск по популярным торрент-трекерам
- [ ] Предоствалять более широкий API для взаимодействия с торрент-трекерами
-  - [ ] getCategoryList(): {id: string, title: string, coverUrl: string}[]
-  - [ ] getVideoList(category: {id: string, title: string, coverUrl: string}): {id: string, title: string, corevUrl: string, duration: number, views: number}[]
-  - [ ] getPopularVideoList(): {id: string, title: string, coverUrl: string}): {id: string, title: string, corevUrl: string, duration: number, views: number}[]
-  - [ ] getVideoUrl(video: {id: string, title: string, coverUrl: string}): {id: string, title: string, corevUrl: string, duration: number, views: number}): string

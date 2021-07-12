import axios from 'axios';

export class SearchService {
    constructor(
        private readonly book_api_v1 = 'https://www.googleapis.com/books/v1/volumes'
    ) { }

    defineSearchType(type: string) {
        let def_type;
        switch (type) {
            case 'autor':
                def_type = 'inauthor';
                break;
            case 'isbn':
                def_type = 'isbn';
                break;
            case 'titulo':
                def_type = 'intitle';
                break;
            default:
                def_type = 'intitle';
        }

        return def_type;
    }

    async searchOnBooksApi(data) {
        try {
            const { term, type } = data;
            let search_type = this.defineSearchType(type.toLowerCase());

            let model = { success: false, search_data: [] };

            const request = await axios.get(`${this.book_api_v1}?q=${term}+${search_type}&key=${process.env.BOOK_KEY}`);
            if (request?.data?.totalItems == 0) return model;

            const final_data = this.treatData(request.data.items);
            model = { success: true, search_data: final_data };

            return model;
        } catch (e) {
            let model = { success: false, search_data: [] };
            return model;
        }
    }

    async findOneBookInfo(id) {
        try {
            let model = { success: false, book_id: null, title: "", book_image: "", authors: [], categories: [] }
            let url = `${this.book_api_v1}/${id}`;

            const request = await axios.get(url);
            if (!request.data) return model;
            
            const { id: book_id } = request.data;
            const { title, authors, categories, image_links } = request.data.volumeInfo;

            model = { success: true, book_id, title, book_image: image_links?.thumbnail, authors, categories };
            return model;
        } catch (e) {
            let model = { success: false }
            return model;
        }
    }

    treatData(api_response) {
        try {
            let final_arr = [];

            for (let index = 0; index < api_response.length; index++) {
                if (final_arr.includes(api_response[index].volumeInfo.title)) continue;

                let model = {
                    book_id: api_response[index].id,
                    book_name: api_response[index].volumeInfo.title,
                    book_image: api_response[index]?.volumeInfo?.imageLinks?.thumbnail,
                    book_categories: api_response[index].volumeInfo.categories,
                    book_authors: api_response[index].volumeInfo.authors
                }

                final_arr.push(model);
            };

            return final_arr;
        } catch (e) {
            throw e;
        }
    }
}

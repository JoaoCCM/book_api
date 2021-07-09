import axios from 'axios';

export class SearchService {
    constructor(
        private readonly book_api_v1 = 'https://www.googleapis.com/books/v1/volumes?q='
    ) { }

    async searchOnBooksApi(data) {
        try {
            const { term } = data;
            
            let model = { success: false, search_data: [] };
            
            const request = await axios.get(`${this.book_api_v1}${term}+intitle&key=${process.env.BOOK_KEY}`);
            if (request.data?.length == 0) return model;
            
            const final_data = this.treatData(request.data.items);
            model = { success: true, search_data: final_data };

            return model;
        } catch (e) {
            console.log('aaaqui', e)
            let model = { success: false, search_data: [] };
            return model;
        }
    }

    treatData(api_response) {
        try {
            let final_arr = [];

            for (let index = 0; index < api_response.length; index++) {
                if (final_arr.includes(api_response[index].volumeInfo.title)) continue;

                let model = {
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

const {
    createMovie,
    getAllMovies,
    getMovie,
    updateMovie,
    deleteMovie
} = require('../service/MovieService');
const Movie = require('../model/MovieModel');

jest.mock('../model/MovieModel');

describe('MovieService', () => {
    const mockMovieData = {
        name: 'Inception',
        Media: 'photo',
        duration: 120
    };
    const mockMovieId = 'mockMovieId';
    const mockMovie = {
        _id: mockMovieId,
        ...mockMovieData
    };

    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe('createMovie', () => {
        it('should create and return the movie if saved successfully', async () => {
            const mockSavedMovie = {
                ...mockMovieData,
                _id: 'mockId'
            };
            Movie.mockImplementation(() => ({
                ...mockMovieData,
                save: jest.fn().mockResolvedValue(mockSavedMovie),
            }));

            const result = await createMovie(mockMovieData);

            expect(Movie).toHaveBeenCalledWith(mockMovieData);
            expect(result).toEqual(mockSavedMovie);
        });

        it('should throw an error if saving the movie fails', async () => {
            const errorMessage = 'Database error';
            Movie.mockImplementation(() => ({
                save: jest.fn().mockRejectedValue(new Error(errorMessage)),
            }));

            await expect(createMovie(mockMovieData)).rejects.toThrow('movie is not added : ' + errorMessage);
        });
    });



});

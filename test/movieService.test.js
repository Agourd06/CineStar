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
    describe('getAllMovies', () => {
        it('should return a list of movies if found', async () => {
            const mockMovies = [{
                _id: 'mockMovieId1',
                name: 'Movie 1',
            }, {
                _id: 'mockMovieId2',
                name: 'Movie 2',
            }];
            Movie.find.mockResolvedValue(mockMovies);

            const result = await getAllMovies();

            expect(Movie.find).toHaveBeenCalledWith({
                deleted_at: null
            });
            expect(result).toEqual(mockMovies);
        });

        it('should throw an error if fetching movies fails', async () => {
            const errorMessage = 'Database error';
            Movie.find.mockRejectedValue(new Error(errorMessage));

            await expect(getAllMovies()).rejects.toThrow('Error fetching movies: ' + errorMessage);
        });
    });

    describe('getMovie', () => {
        it('should return the movie if found', async () => {
            Movie.findOne.mockResolvedValue(mockMovie);

            const result = await getMovie(mockMovieId);

            expect(Movie.findOne).toHaveBeenCalledWith({
                _id: mockMovieId,
                deleted_at: null
            });
            expect(result).toEqual(mockMovie);
        });

        it('should return null if movie is not found', async () => {
            Movie.findOne.mockResolvedValue(null);

            const result = await getMovie(mockMovieId);

            expect(Movie.findOne).toHaveBeenCalledWith({
                _id: mockMovieId,
                deleted_at: null
            });
            expect(result).toBeNull();
        });

        it('should throw an error if fetching the movie fails', async () => {
            const errorMessage = 'Database error';
            Movie.findOne.mockRejectedValue(new Error(errorMessage));

            await expect(getMovie(mockMovieId)).rejects.toThrow('Error fetching Movie: ' + errorMessage);
        });
    });



});

const {
    createAdmin,
    getAdmins,
    getAdmin,
    updateAdmins,
    softDeleteAdmins
} = require('../service/AdminService');
const User = require('../model/UserModel');

jest.mock('../model/UserModel');

describe('AdminService', () => {
    const mockAdminData = {
        username: 'admin',
        password: 'password',
        role: 'admin'
    };
    const mockAdminId = 'mockAdminId';
    const mockAdmin = {
        _id: mockAdminId,
        ...mockAdminData
    };

    beforeEach(() => {
        jest.clearAllMocks();
    });
    describe('createAdmin', () => {
        it('should create and return the admin if saved successfully', async () => {
            const mockSavedAdmin = {
                ...mockAdminData,
                _id: 'mockId'
            };
            User.mockImplementation(() => ({
                ...mockAdminData,
                save: jest.fn().mockResolvedValue(mockSavedAdmin),
            }));

            const result = await createAdmin(mockAdminData);

            expect(User).toHaveBeenCalledWith(mockAdminData);
            expect(result).toEqual(mockSavedAdmin);
        });

        it('should throw an error if saving the admin fails', async () => {
            const errorMessage = 'Database error';
            User.mockImplementation(() => ({
                save: jest.fn().mockRejectedValue(new Error(errorMessage)),
            }));

            await expect(createAdmin(mockAdminData)).rejects.toThrow('admins is not added : ' + errorMessage);
        });
    });
    describe('getAdmins', () => {
        it('should return a list of admins if found', async () => {
            const mockAdmins = [{
                _id: 'mockAdminId1',
                name: 'admin1'
            }, {
                _id: 'mockAdminId2',
                name: 'admin2'
            }];
            User.find.mockResolvedValue(mockAdmins);

            const result = await getAdmins();

            expect(User.find).toHaveBeenCalledWith({
                role: 'admin',
                deleted_at: null
            });
            expect(result).toEqual(mockAdmins);
        });

        it('should throw an error if fetching admins fails', async () => {
            const errorMessage = 'Database error';
            User.find.mockRejectedValue(new Error(errorMessage));

            await expect(getAdmins()).rejects.toThrow('Error fetching admins: ' + errorMessage);
        });
    });
    describe('getAdmin', () => {
        it('should return the admin if found', async () => {
            User.findOne.mockResolvedValue(mockAdmin);

            const result = await getAdmin(mockAdminId);

            expect(User.findOne).toHaveBeenCalledWith({
                _id: mockAdminId,
                role: 'admin',
                deleted_at: null
            });
            expect(result).toEqual(mockAdmin);
        });

        it('should return null if admin is not found', async () => {
            User.findOne.mockResolvedValue(null);

            const result = await getAdmin(mockAdminId);

            expect(User.findOne).toHaveBeenCalledWith({
                _id: mockAdminId,
                role: 'admin',
                deleted_at: null
            });
            expect(result).toBeNull();
        });

        it('should throw an error if fetching the admin fails', async () => {
            const errorMessage = 'Database error';
            User.findOne.mockRejectedValue(new Error(errorMessage));

            await expect(getAdmin(mockAdminId)).rejects.toThrow('Error fetching admin: ' + errorMessage);
        });
    });
    describe('updateAdmins', () => {
        it('should update and return the admin if found', async () => {
            const adminUpdateData = {
                name: 'updatedAdmin'
            };
            User.findOneAndUpdate.mockResolvedValue({
                ...mockAdmin,
                ...adminUpdateData
            });

            const result = await updateAdmins(mockAdminId, adminUpdateData);

            expect(User.findOneAndUpdate).toHaveBeenCalledWith({
                    _id: mockAdminId
                },
                adminUpdateData, {
                    new: true
                }
            );
            expect(result).toEqual({
                ...mockAdmin,
                ...adminUpdateData
            });
        });

        it('should return null if admin is not found', async () => {
            const adminUpdateData = {
                name: 'updatedAdmin'
            };
            User.findOneAndUpdate.mockResolvedValue(null);

            const result = await updateAdmins(mockAdminId, adminUpdateData);

            expect(User.findOneAndUpdate).toHaveBeenCalledWith({
                    _id: mockAdminId
                },
                adminUpdateData, {
                    new: true
                }
            );
            expect(result).toBeNull();
        });

        it('should throw an error if updating the admin fails', async () => {
            const errorMessage = 'Database error';
            User.findOneAndUpdate.mockRejectedValue(new Error(errorMessage));

            await expect(updateAdmins(mockAdminId, {
                name: 'updatedAdmin'
            })).rejects.toThrow(
                'Error updating admin: ' + errorMessage
            );
        });
    });
    describe('softDeleteAdmins', () => {
        const mockAdmin = {
            _id: mockAdminId,
            deleted_at: null,
        };

        it('should soft-delete and return the admin if found', async () => {
            User.findOneAndUpdate.mockResolvedValue({
                ...mockAdmin,
                deleted_at: new Date()
            });

            const result = await softDeleteAdmins(mockAdminId);

            expect(User.findOneAndUpdate).toHaveBeenCalledWith({
                    _id: mockAdminId
                }, {
                    deleted_at: expect.any(Date)
                }, // We expect the deleted_at to be set to a date
                {
                    new: true
                }
            );
            expect(result).toEqual({
                ...mockAdmin,
                deleted_at: expect.any(Date)
            }); // Check the returned admin object
        });

        it('should throw an error if admin is not found', async () => {
            User.findOneAndUpdate.mockResolvedValue(null); // Simulate admin not found

            await expect(softDeleteAdmins(mockAdminId)).rejects.toThrow('Admin not found');
        });

        it('should throw an error if soft-deleting the admin fails', async () => {
            const errorMessage = 'Database error';
            User.findOneAndUpdate.mockRejectedValue(new Error(errorMessage)); // Simulate an error

            await expect(softDeleteAdmins(mockAdminId)).rejects.toThrow('Error soft-deleting admin: ' + errorMessage);
        });
    });
});
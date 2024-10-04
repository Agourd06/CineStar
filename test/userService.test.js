const  { getClient }  = require('../service/ClientService'); 
const User = require('../model/UserModel.js');

jest.mock('../model/UserModel.js'); 

describe('getClient', () => {
  const mockClientId = 'mockClientId';
  const mockClientData = { _id: mockClientId, role: 'client' };

  beforeEach(() => {
    jest.clearAllMocks(); 
  });

  it('should return the client if found', async () => {
    User.findOne.mockResolvedValue(mockClientData); 

    const client = await getClient(mockClientId);

    expect(User.findOne).toHaveBeenCalledWith({
      role: 'client',
      _id: mockClientId,
      deleted_at: null
    });
    expect(client).toEqual(mockClientData);
  });

  it('should throw an error if an error occurs during fetching', async () => {
    User.findOne.mockRejectedValue(new Error('Database error'));

    await expect(getClient(mockClientId)).rejects.toThrow('Error fetching Client: Database error');
  });

  it('should return null if client not found', async () => {
    User.findOne.mockResolvedValue(null); 

    const client = await getClient(mockClientId);

    expect(client).toBeNull();
  });
});

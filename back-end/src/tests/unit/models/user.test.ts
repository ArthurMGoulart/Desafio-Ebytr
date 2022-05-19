import { expect } from 'chai';
import mongoose, { Model, Document } from 'mongoose';
import sinon, { SinonStub } from 'sinon';
import { User } from '../../../interfaces'
import { UserModel, UserSchema } from '../../../models';

describe('Unit Test User Model', () => {
  let userModel: UserModel;
  let stubModel: Model<User & Document>;

  const mockUser = {
    name: "teste",
    email: "teste@gmail.com",
    password: "123456"
  }

  before(() => {
    sinon.stub(mongoose, 'model').returns({
      create: sinon.stub().resolves('Created'),
      findOne: sinon.stub().resolves('Found'),
    });

    stubModel = mongoose.model('Users', UserSchema);
    userModel = new UserModel(stubModel);
  });

  after(() => {
    (mongoose.model as any).restore();
  });

  it('should call create method on create', async () => {
    const userCreated = await userModel.create(mockUser);
    expect((stubModel.create as SinonStub).calledWith(mockUser)).to.be.true;
    expect(userCreated).to.be.equal('Created');
  });

  it('should call findOne method on findByEmail', async () => {
    const { email } = mockUser;
    const userByEmail = await userModel.findByEmail(email);
    expect((stubModel.findOne as SinonStub).calledWith({ email })).to.be.true;
    expect(userByEmail).to.be.equal('Found');
  });
})

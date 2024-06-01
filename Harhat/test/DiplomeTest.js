const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Diplome Contract", function () {
  let Diplome, diplome, owner, admin, user, nonUser;

  beforeEach(async function () {
    [owner, admin, user, nonUser] = await ethers.getSigners();

    const Diplome = await ethers.getContractFactory("diplome");
    diplome = await Diplome.deploy();
    await diplome.waitForDeployment();

    // Add admin and user
    await diplome.addAdmin(admin.address);
    await diplome.connect(admin).addUser(user.address);
  });

  describe("Admin Management", function () {


    it("Should not allow non-admins to add or remove admins", async function () {
      await expect(diplome.connect(nonUser).addAdmin(nonUser.address)).to.be.revertedWith("Admin not found");
      await expect(diplome.connect(nonUser).removeAdmin(owner.address)).to.be.revertedWith("Admin not found");
    });
  });

  describe("User Management", function () {
    it("Should add and remove users correctly", async function () {
      await diplome.connect(admin).addUser(nonUser.address);
      expect(await diplome.users(nonUser.address)).to.equal(fa);


    });

    it("Should not allow non-admins to add or remove users", async function () {
      await expect(diplome.connect(nonUser).addUser(nonUser.address)).to.be.revertedWith("Admin not found");
      await expect(diplome.connect(nonUser).removeUser(user.address)).to.be.revertedWith("Admin not found");
    });
  });

  describe("Diploma Management", function () {
    it("Should add a diploma correctly", async function () {
      const diplomaData = {
        owner: user.address,
        firstName: "John",
        lastName: "Doe",
        nom: "Computer Science",
        prenom: "BSc",
        fillier: "Engineering",
        promo: "2023",
        email: "john.doe@example.com",
        institut: "Example University",
        ipfsHash: ethers.utils.formatBytes32String("Qm...")
      };

      await diplome.connect(user).addDiploma(
        diplomaData.owner,
        diplomaData.firstName,
        diplomaData.lastName,
        diplomaData.nom,
        diplomaData.prenom,
        diplomaData.fillier,
        diplomaData.promo,
        diplomaData.email,
        diplomaData.institut,
        diplomaData.ipfsHash
      );

      const addedDiploma = await diplome.getDiploma(diplomaData.owner);

      expect(addedDiploma.nom).to.equal(diplomaData.nom);
      expect(addedDiploma.prenom).to.equal(diplomaData.prenom);
      expect(addedDiploma.fillier).to.equal(diplomaData.fillier);
      expect(addedDiploma.promo).to.equal(diplomaData.promo);
      expect(addedDiploma.email).to.equal(diplomaData.email);
      expect(addedDiploma.institut).to.equal(diplomaData.institut);
      expect(addedDiploma.ipfsHash).to.equal(diplomaData.ipfsHash);
    });

    it("Should not allow non-users to add a diploma", async function () {
      const diplomaData = {
        owner: nonUser.address,
        firstName: "John",
        lastName: "Doe",
        nom: "Computer Science",
        prenom: "BSc",
        fillier: "Engineering",
        promo: "2023",
        email: "john.doe@example.com",
        institut: "Example University",
        ipfsHash: ethers.utils.formatBytes32String("Qm...")
      };

      await expect(
        diplome.connect(nonUser).addDiploma(
          diplomaData.owner,
          diplomaData.firstName,
          diplomaData.lastName,
          diplomaData.nom,
          diplomaData.prenom,
          diplomaData.fillier,
          diplomaData.promo,
          diplomaData.email,
          diplomaData.institut,
          diplomaData.ipfsHash
        )
      ).to.be.revertedWith("User not found");
    });
  });

  describe("Diploma Verification", function () {
    it("Should verify a diploma correctly", async function () {
      const diplomaData = {
        owner: user.address,
        firstName: "John",
        lastName: "Doe",
        nom: "Computer Science",
        prenom: "BSc",
        fillier: "Engineering",
        promo: "2023",
        email: "john.doe@example.com",
        institut: "Example University",
        ipfsHash: ethers.utils.formatBytes32String("Qm...")
      };

      await diplome.connect(user).addDiploma(
        diplomaData.owner,
        diplomaData.firstName,
        diplomaData.lastName,
        diplomaData.nom,
        diplomaData.prenom,
        diplomaData.fillier,
        diplomaData.promo,
        diplomaData.email,
        diplomaData.institut,
        diplomaData.ipfsHash
      );

      const isValid = await diplome.verifyDiploma(
        diplomaData.owner,
        diplomaData.nom,
        diplomaData.prenom,
        diplomaData.email,
        diplomaData.promo
      );

      expect(isValid).to.be.true;
    });

    it("Should not verify an invalid diploma", async function () {
      const isValid = await diplome.verifyDiploma(
        ethers.utils.formatBytes32String("invalid"),
        "Computer Science",
        "BSc",
        "john.doe@example.com",
        "2023"
      );

      expect(isValid).to.be.false;
    });
  });
});

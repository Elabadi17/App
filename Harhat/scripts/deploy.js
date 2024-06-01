const hre = require("hardhat");
const axios = require("axios");

async function main() {
  const diplome = await hre.ethers.getContractFactory("diplome");
  const Diplome = await diplome.deploy();
  await Diplome.waitForDeployment();
  console.log(`Contract deployed to ${Diplome.address}`);

  const userFormData = {
    name: 'admin',
    password: 'admin',
    address: process.env.ADDRESS || '',
    roles: 'ROLE_ADMIN'
  };

  try {
    const response = await axios.post('http://localhost:8080/auth/addNewUser', userFormData);
    console.log('User added successfully:', response.data);
  } catch (error) {
    console.error('Error adding user:', error.message);
  }
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

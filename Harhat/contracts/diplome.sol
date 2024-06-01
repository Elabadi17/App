// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.8.1 <0.9.0;

contract diplome {
    struct Diploma {
        bytes32 DiplomaId;
        string nom;
        string prenom;
        string fillier;
        string promo; 
        string email;
        string institut;
        address owner;
        string ipfsHash;
    }

    mapping(address => bool) private admins;
    mapping(address => bool) private users;

    // Diploma storage
    Diploma[] public diplomas;
    uint256 public diplomasCount;

    event DiplomaAdded(bytes32 indexed diplomaId, address indexed owner, string nom, string prenom);
    event UserAdded(address indexed user);
    event UserRemoved(address indexed user);
    event AdminAdded(address indexed admin);
    event AdminRemoved(address indexed admin);

    constructor() {
        admins[msg.sender] = true; // specify the admin when deploying the contract
        diplomasCount = 0;
    }

    modifier onlyAdmin() {
        require(admins[msg.sender], "Admin not found");
        _;
    }

    modifier onlyUser() {
        require(users[msg.sender], "User not found");
        _;
    }

    function addUser(address newUser) public onlyAdmin {
        users[newUser] = true;
        emit UserAdded(newUser);
    }

    function removeUser(address user) public onlyAdmin {
        users[user] = false;
        emit UserRemoved(user);
    }

    function addAdmin(address newAdmin) public onlyAdmin {
        admins[newAdmin] = true;
        emit AdminAdded(newAdmin);
    }

    function removeAdmin(address admin) public onlyAdmin {
        admins[admin] = false;
        emit AdminRemoved(admin);
    }

    function addDiploma(
        address _owner, 
        string memory _nom, 
        string memory _prenom, 
        string memory _fillier, 
        string memory _promo, 
        string memory _email, 
        string memory _institut, 
        string memory _ipfsHash
    ) public onlyUser {  
        bytes32 id = keccak256(abi.encodePacked(_owner, _nom, _prenom, _fillier, _promo, _email, _institut, _ipfsHash));
        diplomas.push(Diploma(id, _nom, _prenom, _fillier, _promo, _email, _institut, _owner, _ipfsHash)); 
        diplomasCount++; 
        emit DiplomaAdded(id, _owner, _nom, _prenom); 
    } 

    function getDiploma(bytes32 _DiplomaId) public view returns (Diploma memory) {
        for (uint i = 0; i < diplomasCount; i++) {
            if (diplomas[i].DiplomaId == _DiplomaId) {
                return diplomas[i];
            }
        }
        revert("Diploma not found");
    }

    function verifyDiploma(
        bytes32 _DiplomaId, 
        string memory _nom, 
        string memory _prenom, 
        string memory _email, 
        string memory _promo
    ) public view returns (bool) {
        for (uint i = 0; i < diplomasCount; i++) {
            if (
                diplomas[i].DiplomaId == _DiplomaId && 
                keccak256(abi.encodePacked(diplomas[i].nom)) == keccak256(abi.encodePacked(_nom)) &&
                keccak256(abi.encodePacked(diplomas[i].prenom)) == keccak256(abi.encodePacked(_prenom)) &&
                keccak256(abi.encodePacked(diplomas[i].email)) == keccak256(abi.encodePacked(_email)) &&
                keccak256(abi.encodePacked(diplomas[i].promo)) == keccak256(abi.encodePacked(_promo))
            ) {
                return true;
            }
        }
        return false;
    }

    function getAllDiplomaIdsWithStudentName() public view returns (string[] memory, bytes32[] memory) {
        string[] memory names = new string[](diplomasCount);
        bytes32[] memory ids = new bytes32[](diplomasCount);

        for (uint i = 0; i < diplomasCount; i++){ 
            names[i] = string(abi.encodePacked(diplomas[i].nom, " ", diplomas[i].prenom));
            ids[i] = diplomas[i].DiplomaId;
        }

        return (names, ids);
    }

    function getNumberOfDiplomas() public view returns (uint256) {
        return diplomasCount;
    }
}

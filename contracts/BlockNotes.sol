//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.4;

import "hardhat/console.sol";

contract BlockNotes {

    struct Task {
        uint id;
        string name;
        bool completed;
        bool isValue;
    }

    mapping(uint => Task) public tasks;
    
    constructor() {}

    // VIEW
    function get(uint _id) public view returns (Task memory) {
        return tasks[_id];
    }

    // CREATE
    function create(uint _id, string calldata _name) external {
        require(tasks[_id].isValue == false, "Another task was declared with this ID already.");
        Task memory newTask;
        newTask = Task(_id, _name, false, true); 
        tasks[_id] = newTask; 
    }

    // UPDATE
    function updateName(uint _id, string calldata _newName) external {
        tasks[_id].name = _newName;
    } 

    function updateState(uint _id) external {
        tasks[_id].completed = true;
    } 

    // TEST 
    function isValue(uint _id) public view returns (bool) {
        return tasks[_id].isValue;
    }

    function getName(uint _id) public view returns (string memory) {
        return tasks[_id].name;
    }

    function getState(uint _id) public view returns (bool) {
        return tasks[_id].completed;
    }
}

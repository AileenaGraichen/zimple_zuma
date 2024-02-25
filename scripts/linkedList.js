"use strict";

class Node {
    constructor(data) {
      this.prev = null;
      this.next = null;
      this.data = data;
    }
  }
  
  class LinkedList {
    constructor() {
      this.head = null;
      this.tail = null;
    }
  
    add(payload) {
      const newNode = new Node(payload);
      if (!this.head) {
        this.head = newNode;
        this.tail = newNode;
      } else {
        this.tail.next = newNode;
        newNode.prev = this.tail;
        this.tail = newNode;
      }
    }
  
    addLast(payload) {
      this.add(payload);
    }
  
    addFirst(payload) {
      const newNode = new Node(payload);
      if (!this.head) {
        this.head = newNode;
        this.tail = newNode;
      } else {
        newNode.next = this.head;
        this.head.prev = newNode;
        this.head = newNode;
      }
    }
  
    clear() {
      this.head = null;
      this.tail = null;
    }
  
    get(index) {
      let currentNode = this.head;
      let count = 0;
      while (currentNode != null) {
        if (count === index) return currentNode.data;
        count++;
        currentNode = currentNode.next;
      }
      return undefined;
    }
  
    indexOf(payload) {
      let currentNode = this.head;
      let index = 0;
      while (currentNode != null) {
        if (currentNode.data === payload) return index;
        currentNode = currentNode.next;
        index++;
      }
      return -1;
    }
  
    insertAfter(index, payload) {
      const nodeBefore = this.nodeAt(index);
      if (!nodeBefore) return;
      const newNode = new Node(payload);
      newNode.next = nodeBefore.next;
      newNode.prev = nodeBefore;
      if (nodeBefore.next) nodeBefore.next.prev = newNode;
      nodeBefore.next = newNode;
      if (nodeBefore === this.tail) this.tail = newNode;
    }
  
    insertBefore(index, payload) {
      const nodeAfter = this.nodeAt(index);
      if (!nodeAfter) return;
      const newNode = new Node(payload);
      newNode.prev = nodeAfter.prev;
      newNode.next = nodeAfter;
      if (nodeAfter.prev) nodeAfter.prev.next = newNode;
      nodeAfter.prev = newNode;
      if (nodeAfter === this.head) this.head = newNode;
    }
  
    first() {
      return this.head ? this.head.data : undefined;
    }
  
    last() {
      return this.tail ? this.tail.data : undefined;
    }
  
    remove(index) {
      const nodeToRemove = this.nodeAt(index);
      if (!nodeToRemove) return undefined;
      if (nodeToRemove.prev) nodeToRemove.prev.next = nodeToRemove.next;
      if (nodeToRemove.next) nodeToRemove.next.prev = nodeToRemove.prev;
      if (nodeToRemove === this.head) this.head = nodeToRemove.next;
      if (nodeToRemove === this.tail) this.tail = nodeToRemove.prev;
      return nodeToRemove.data;
    }
  
    removeFirst() {
      if (!this.head) return undefined;
      const data = this.head.data;
      this.head = this.head.next;
      if (this.head) this.head.prev = null;
      else this.tail = null;
      return data;
    }
  
    removeLast() {
      if (!this.tail) return undefined;
      const data = this.tail.data;
      this.tail = this.tail.prev;
      if (this.tail) this.tail.next = null;
      else this.head = null;
      return data;
    }
  
    nodeAt(index) {
      let currentNode = this.head;
      let count = 0;
      while (currentNode != null) {
        if (count === index) return currentNode;
        count++;
        currentNode = currentNode.next;
      }
      return null;
    }
  
    insertAfterNode(payload, existingNode) {
      const newNode = new Node(payload);
      newNode.next = existingNode.next;
      newNode.prev = existingNode;
      if (existingNode.next) existingNode.next.prev = newNode;
      existingNode.next = newNode;
      if (existingNode === this.tail) this.tail = newNode;
    }
  
    insertBeforeNode(payload, existingNode) {
      const newNode = new Node(payload);
      newNode.prev = existingNode.prev;
      newNode.next = existingNode;
      if (existingNode.prev) existingNode.prev.next = newNode;
      existingNode.prev = newNode;
      if (existingNode === this.head) this.head = newNode;
    }
  
    removeNode(node) {
      if (!node.prev) this.head = node.next;
      else node.prev.next = node.next;
      if (!node.next) this.tail = node.prev;
      else node.next.prev = node.prev;
    }
  
    swapNodes(nodeA, nodeB) {
      if (nodeA === nodeB) return;
  
      let tempPrev = nodeA.prev;
      let tempNext = nodeA.next;
      nodeA.prev = nodeB.prev === nodeA ? nodeB : nodeB.prev;
      nodeA.next = nodeB.next === nodeA ? nodeB : nodeB.next;
  
      nodeB.prev = tempPrev === nodeB ? nodeA : tempPrev;
      nodeB.next = tempNext === nodeB ? nodeA : tempNext;
  
      if (nodeA.prev) nodeA.prev.next = nodeA;
      if (nodeA.next) nodeA.next.prev = nodeA;
      if (nodeB.prev) nodeB.prev.next = nodeB;
      if (nodeB.next) nodeB.next.prev = nodeB;
  
      if (this.head === nodeA) this.head = nodeB;
      else if (this.head === nodeB) this.head = nodeA;
  
      if (this.tail === nodeA) this.tail = nodeB;
      else if (this.tail === nodeB) this.tail = nodeA;
    }
  
    dumpList() {
      let currentNode = this.head;
      console.log("List:");
      while (currentNode) {
        console.log(` - node: ${currentNode.data}`);
        console.log(`   prev: ${currentNode.prev ? currentNode.prev.data : 'null'}`);
        console.log(`   next: ${currentNode.next ? currentNode.next.data : 'null'}`);
        currentNode = currentNode.next;
      }
    }

    length() {
        let count = 0;
        let currentNode = this.head;
        while (currentNode != null) {
            count++;
            currentNode = currentNode.next;
        }
        return count;
    }
  }

  export default LinkedList;
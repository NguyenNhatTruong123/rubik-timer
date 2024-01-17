class ResultTree {
    constructor() {
        this.root = null
    }

    insert(data) {
        if (this.root === null)
            this.root = data;
        else
            this.insertNode(this.root, data);
    }

    insertNode(node, data) {
        if (data.time <= node.time) {
            if (node.left === null)
                node.left = data;
            else
                this.insertNode(node.left, data);
        }
        else {
            if (node.right === null)
                node.right = data;
            else
                this.insertNode(node.right, data);
        }
    }

    findMinNode(node) {
        if (node.left === null)
            return node;
        else
            return this.findMinNode(node.left);
    }

    removeAll(node) {
        if (node === null) {
            return null;
        }

        // Remove left and right subtrees recursively
        node.left = this.removeAll(node.left);
        node.right = this.removeAll(node.right);

        // Remove the current node
        node = null;
        return node;
    }
}
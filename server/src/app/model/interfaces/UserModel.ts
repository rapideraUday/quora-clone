import mongoose = require('mongoose');

interface UserModel extends mongoose.Document{

    id?: string;
    name: string;
    marks: number;
    section: string;
}

export = UserModel;
class Constants {
    static DB_CONNECTION_STRING: string = process.env.DB_URL;
}

Object.seal(Constants);
export = Constants;
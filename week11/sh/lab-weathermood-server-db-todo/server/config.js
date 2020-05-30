try {
    switch (process.env.NODE_ENV) {
        case 'development':
            process.env.DB_URL = `postgres://${process.env.PG_USERNAME}:${process.env.PG_PASSWORD}@${process.env.PG_HOSTNAME}:${process.env.PG_PORT}/${process.env.PG_DB_NAME}`;
            break;
        default: // 'staging' or 'production'
            process.env.DB_URL = `postgres://${process.env.RDS_USERNAME}:${process.env.RDS_PASSWORD}@${process.env.RDS_HOSTNAME}:${process.env.RDS_PORT}/${process.env.RDS_DB_NAME}`;
            break;
    }
    // process.env.DB_URL = `postgres://kkeevin123456:wimming123@chishen-test.c51vely5v4cc.us-east-1.rds.amazonaws.com:5432/weathermood`;
    // process.env.DB_URL = `postgres://postgres:0910shc@localhost:5432/weathermood`;
    process.env.DB_URL = `postgres://postgres:0910shc@localhost:5432/weathermood`;
} catch (err) {
    console.log(err, '\n\nError configuring the project. Have you set the environment veriables?');
}

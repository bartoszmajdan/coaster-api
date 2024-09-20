import express from 'express';
const app = express();

const init = async () => {
    const port = process.env.PORT || 3000;

    try {
        await app.listen(port);
        console.log(`Server listening on port ${port}`);
    } catch (ex) {
        console.log(ex);
    }
};

init();

export default init;
export { app };

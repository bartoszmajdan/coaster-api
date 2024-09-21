enum ENVIROMENTS {
    PRODUCTION = 'production',
    DEVELOPMENT = 'development',
}

const getEnvioroment = (): ENVIROMENTS => {
    const env = process.env.NODE_ENV;

    if (env === ENVIROMENTS.PRODUCTION) {
        return ENVIROMENTS.PRODUCTION;
    }

    return ENVIROMENTS.DEVELOPMENT;
};

const isProduction = (): boolean => getEnvioroment() === ENVIROMENTS.PRODUCTION;

export { isProduction };
export type { ENVIROMENTS };
export default getEnvioroment;

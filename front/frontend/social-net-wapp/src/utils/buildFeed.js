import getReq from './getReq';

const buildFeed = async () => {
    const data = await getReq();
    return data;
};

export default buildFeed;


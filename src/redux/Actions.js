
//Action
export const MODIFY_AK = "MODIFY_AK";
export const MODIFY_SK = "MODIFY_SK";
export const MODIFY_HOST = "MODIFY_HOST";
export const MODIFY_BUCKET = "MODIFY_BUCKET";
export const MODIFY_CONFIG = "MODIFY_CONFIG";

export function modifyAK(ak) {
    return {
        type: MODIFY_AK,
        config: {
            ak: ak
        }
    }
}

export function modifyConfig(ak, sk, bucket, host) {
    return {
        type: MODIFY_CONFIG,
        config: {
            ak: ak,
            sk: sk,
            bucket: bucket,
            host: host
        }
    }
}
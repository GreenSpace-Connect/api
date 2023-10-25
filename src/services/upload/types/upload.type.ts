import { UploadApiErrorResponse, UploadApiResponse } from 'cloudinary';

export type UploadResponse = UploadApiResponse | UploadApiErrorResponse;

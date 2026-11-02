import { apiClient } from "@/lib/config/axios";
import type { AddressSchemaType } from "@/lib/schemas/address";
import type { AddressResponse, CustomerAddress } from "@/services/user/type";


export const addressApi = {
    // 1. GET /api/addresses - Lấy danh sách sổ địa chỉ
    getAddresses: async (): Promise<CustomerAddress[]> => {
        const response = await apiClient.get<AddressResponse>("/addresses");
        const resData = response.data as any;
        return Array.isArray(resData) ? resData : resData?.data || [];
    },

    // 2. POST /api/addresses - Thêm mới địa chỉ
    addAddress: async (data: AddressSchemaType): Promise<CustomerAddress> => {
        const requestBody = {
            Label: data.label,
            ContactName: data.contactName,
            ContactPhone: data.contactPhone,
            FullAddress: data.fullAddress,
            IsDefault: data.isDefault,
            Lat: data.lat,
            Lng: data.lng,
        };
        const response = await apiClient.post<AddressResponse>("/addresses", requestBody);
        const resData = response.data as any;
        return resData?.data || resData;
    },

    // 3. PUT /api/addresses/{id} - Cập nhật địa chỉ
    updateAddress: async (id: string | number, data: AddressSchemaType): Promise<CustomerAddress> => {
        const requestBody = {
            Label: data.label,
            ContactName: data.contactName,
            ContactPhone: data.contactPhone,
            FullAddress: data.fullAddress,
            IsDefault: data.isDefault,
            Lat: data.lat,
            Lng: data.lng,
        };
        const response = await apiClient.put<AddressResponse>(`/addresses/${id}`, requestBody);
        const resData = response.data as any;
        return resData?.data || resData;
    },

    // 4. DELETE /api/addresses/{id} - Xóa địa chỉ
    deleteAddress: async (id: string | number): Promise<void> => {
        await apiClient.delete(`/addresses/${id}`);
    },

    // 5. Đặt địa chỉ mặc định (Sử dụng API PUT cập nhật lại trạng thái IsDefault = true cho địa chỉ đó)
    setDefaultAddress: async (address: CustomerAddress): Promise<void> => {
        const requestBody = {
            Label: address.label,
            ContactName: address.contactName,
            ContactPhone: address.contactPhone,
            FullAddress: address.fullAddress,
            IsDefault: true, // Bật cờ mặc định
            Lat: address.lat,
            Lng: address.lng,
        };
        await apiClient.put(`/addresses/${address.id}`, requestBody);
    },

};
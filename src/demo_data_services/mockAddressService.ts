export interface CustomerAddress {
    id: string;
    label: string;
    contactName: string;
    contactPhone: string;
    fullAddress: string;
    isDefault: boolean;
}

const ADDRESS_STORAGE_KEY = "shiptrack_customer_addresses";

const initMockAddresses = (): CustomerAddress[] => {
    const existing = localStorage.getItem(ADDRESS_STORAGE_KEY);
    if (existing) return JSON.parse(existing);

    const defaultAddresses: CustomerAddress[] = [
        {
            id: "addr_1",
            label: "Nhà riêng",
            contactName: "Trần Thị B",
            contactPhone: "0923456789",
            fullAddress: "123 Nguyễn Thị Minh Khai, Phường Bến Thành, Quận 1, TP. Hồ Chí Minh",
            isDefault: true,
        },
        {
            id: "addr_2",
            label: "Công ty / Văn phòng",
            contactName: "Trần Thị B",
            contactPhone: "0923456789",
            fullAddress: "789 Điện Biên Phủ, Phường 22, Quận Bình Thạnh, TP. Hồ Chí Minh",
            isDefault: false,
        },
    ];

    localStorage.setItem(ADDRESS_STORAGE_KEY, JSON.stringify(defaultAddresses));
    return defaultAddresses;
};

export const mockAddressService = {
    getAddresses: async (): Promise<CustomerAddress[]> => {
        await new Promise((resolve) => setTimeout(resolve, 300));
        return initMockAddresses();
    },

    addAddress: async (data: Omit<CustomerAddress, "id">): Promise<CustomerAddress> => {
        await new Promise((resolve) => setTimeout(resolve, 400));
        let addresses = initMockAddresses();

        if (data.isDefault) {
            addresses = addresses.map((a) => ({ ...a, isDefault: false }));
        }

        const newAddress: CustomerAddress = {
            ...data,
            id: `addr_${Date.now()}`,
        };

        addresses.unshift(newAddress);
        localStorage.setItem(ADDRESS_STORAGE_KEY, JSON.stringify(addresses));
        return newAddress;
    },

    updateAddress: async (id: string, data: Partial<CustomerAddress>): Promise<CustomerAddress> => {
        await new Promise((resolve) => setTimeout(resolve, 400));
        let addresses = initMockAddresses();

        if (data.isDefault) {
            addresses = addresses.map((a) => ({ ...a, isDefault: false }));
        }

        const index = addresses.findIndex((a) => a.id === id);
        if (index === -1) throw new Error("Không tìm thấy địa chỉ!");

        addresses[index] = { ...addresses[index], ...data };
        localStorage.setItem(ADDRESS_STORAGE_KEY, JSON.stringify(addresses));
        return addresses[index];
    },

    deleteAddress: async (id: string): Promise<void> => {
        await new Promise((resolve) => setTimeout(resolve, 300));
        let addresses = initMockAddresses();
        addresses = addresses.filter((a) => a.id !== id);
        localStorage.setItem(ADDRESS_STORAGE_KEY, JSON.stringify(addresses));
    },

    setDefaultAddress: async (id: string): Promise<void> => {
        await new Promise((resolve) => setTimeout(resolve, 300));
        let addresses = initMockAddresses();
        addresses = addresses.map((a) => ({
            ...a,
            isDefault: a.id === id,
        }));
        localStorage.setItem(ADDRESS_STORAGE_KEY, JSON.stringify(addresses));
    },
};
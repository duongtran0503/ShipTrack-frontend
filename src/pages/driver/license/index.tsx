import { Loader2 } from "lucide-react";
import { LicenseAlerts } from "./components/license-alerts";
import { LicenseForm } from "./components/license-form";
import { LicenseImageCard } from "./components/license-image-card";
import { useDriverLicense } from "./hooks/use-driver-license";

export default function DriverLicensePage() {
    const {
        license,
        isLoading,
        form,
        onSubmit,
        imagePreview,
        handleImageChange,
        isSaving,
        checkExpiryStatus,
    } = useDriverLicense();

    if (isLoading || !license) {
        return (
            <div className="flex items-center justify-center py-20 text-xs text-muted-foreground">
                <Loader2 className="size-6 animate-spin text-primary mr-2" />
                Đang tải thông tin bằng lái...
            </div>
        );
    }

    const currentImage = imagePreview || license.licenseImageUrl;
    const expiryInfo = checkExpiryStatus(license.expiryDate);

    return (
        <div className="w-full space-y-6 pb-10">
            {/* Các khối cảnh báo */}
            <LicenseAlerts license={license} expiryInfo={expiryInfo} />

            {/* Layout 2 cột */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 w-full">
                {/* Cột trái: Form */}
                <div className="lg:col-span-2 w-full">
                    <LicenseForm
                        form={form}
                        onSubmit={onSubmit}
                        isSaving={isSaving}
                        imagePreview={imagePreview}
                        approvalStatus={license.approvalStatus}
                    />
                </div>

                {/* Cột phải: Ảnh & Upload */}
                <div className="lg:col-span-1 space-y-6 w-full">
                    <LicenseImageCard
                        currentImage={currentImage}
                        handleImageChange={handleImageChange}
                    />
                </div>
            </div>
        </div>
    );
}
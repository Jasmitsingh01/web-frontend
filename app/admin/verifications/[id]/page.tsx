'use client'

import { useState } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft, CheckCircle, XCircle, Download, Eye } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Modal } from "@/components/ui/modal"
import { Input } from "@/components/ui/input"

export default function VerificationReviewPage({ params }: { params: { id: string } }) {
    const router = useRouter()
    const [isRejectModalOpen, setIsRejectModalOpen] = useState(false)
    const [rejectionReason, setRejectionReason] = useState("")

    // Mock verification data
    const verification = {
        id: params.id,
        userName: "Jane Smith",
        email: "jane@example.com",
        submittedDate: "2024-03-15 10:30 AM",
        status: "pending",
        documents: [
            { id: 1, type: "Identity Front", filename: "id_front.jpg", uploadDate: "2024-03-15", status: "uploaded" },
            { id: 2, type: "Identity Back", filename: "id_back.jpg", uploadDate: "2024-03-15", status: "uploaded" },
            { id: 3, type: "Address Proof", filename: "utility_bill.pdf", uploadDate: "2024-03-15", status: "uploaded" },
            { id: 4, type: "Bank Statement", filename: "bank_statement.pdf", uploadDate: "2024-03-15", status: "uploaded" },
            { id: 5, type: "Selfie with ID", filename: "selfie.jpg", uploadDate: "2024-03-15", status: "uploaded" },
        ],
        userInfo: {
            fullName: "Jane Smith",
            dateOfBirth: "1990-05-15",
            address: "123 Main St, New York, NY 10001",
            phone: "+1 (555) 987-6543",
            nationality: "United States"
        }
    }

    const handleApprove = () => {
        alert(`Verification approved for ${verification.userName}`)
        router.push("/admin")
    }

    const handleReject = () => {
        if (rejectionReason) {
            alert(`Verification rejected for ${verification.userName}\nReason: ${rejectionReason}`)
            setIsRejectModalOpen(false)
            router.push("/admin")
        }
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-950 via-emerald-950 to-slate-950 text-white">
            <div className="max-w-6xl mx-auto p-6">
                {/* Header */}
                <div className="mb-8">
                    <Button
                        variant="ghost"
                        onClick={() => router.back()}
                        className="mb-4 text-slate-400 hover:text-white"
                    >
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Back to Verifications
                    </Button>
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-3xl font-bold mb-2">KYC Verification Review</h1>
                            <p className="text-slate-400">{verification.userName} - {verification.email}</p>
                        </div>
                        <Badge variant="neutral">{verification.status}</Badge>
                    </div>
                </div>

                {/* User Information */}
                <div className="mb-6 bg-gradient-to-br from-slate-900/50 to-slate-800/30 backdrop-blur-sm border border-white/10 rounded-lg p-6">
                    <h2 className="text-xl font-bold mb-4">User Information</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <p className="text-sm text-slate-400 mb-1">Full Name</p>
                            <p className="font-medium">{verification.userInfo.fullName}</p>
                        </div>
                        <div>
                            <p className="text-sm text-slate-400 mb-1">Date of Birth</p>
                            <p className="font-medium">{verification.userInfo.dateOfBirth}</p>
                        </div>
                        <div>
                            <p className="text-sm text-slate-400 mb-1">Address</p>
                            <p className="font-medium">{verification.userInfo.address}</p>
                        </div>
                        <div>
                            <p className="text-sm text-slate-400 mb-1">Phone</p>
                            <p className="font-medium">{verification.userInfo.phone}</p>
                        </div>
                        <div>
                            <p className="text-sm text-slate-400 mb-1">Nationality</p>
                            <p className="font-medium">{verification.userInfo.nationality}</p>
                        </div>
                        <div>
                            <p className="text-sm text-slate-400 mb-1">Submitted Date</p>
                            <p className="font-medium">{verification.submittedDate}</p>
                        </div>
                    </div>
                </div>

                {/* Documents */}
                <div className="mb-6 bg-gradient-to-br from-slate-900/50 to-slate-800/30 backdrop-blur-sm border border-white/10 rounded-lg p-6">
                    <h2 className="text-xl font-bold mb-4">Submitted Documents</h2>
                    <div className="space-y-4">
                        {verification.documents.map((doc) => (
                            <div key={doc.id} className="p-4 bg-white/5 rounded-lg">
                                <div className="flex items-center justify-between">
                                    <div className="flex-1">
                                        <p className="font-medium mb-1">{doc.type}</p>
                                        <p className="text-sm text-slate-400">{doc.filename}</p>
                                        <p className="text-xs text-slate-500 mt-1">Uploaded: {doc.uploadDate}</p>
                                    </div>
                                    <div className="flex gap-2">
                                        <Button size="sm" variant="outline">
                                            <Eye className="w-4 h-4 mr-2" />
                                            View
                                        </Button>
                                        <Button size="sm" variant="outline">
                                            <Download className="w-4 h-4 mr-2" />
                                            Download
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Verification Notes */}
                <div className="mb-6 bg-gradient-to-br from-slate-900/50 to-slate-800/30 backdrop-blur-sm border border-white/10 rounded-lg p-6">
                    <h2 className="text-xl font-bold mb-4">Verification Checklist</h2>
                    <div className="space-y-3">
                        <label className="flex items-center gap-3 cursor-pointer">
                            <input type="checkbox" className="w-4 h-4 rounded border-white/20 bg-white/5" />
                            <span className="text-sm">Identity document is clear and readable</span>
                        </label>
                        <label className="flex items-center gap-3 cursor-pointer">
                            <input type="checkbox" className="w-4 h-4 rounded border-white/20 bg-white/5" />
                            <span className="text-sm">Address proof is recent (within 3 months)</span>
                        </label>
                        <label className="flex items-center gap-3 cursor-pointer">
                            <input type="checkbox" className="w-4 h-4 rounded border-white/20 bg-white/5" />
                            <span className="text-sm">Bank statement matches user information</span>
                        </label>
                        <label className="flex items-center gap-3 cursor-pointer">
                            <input type="checkbox" className="w-4 h-4 rounded border-white/20 bg-white/5" />
                            <span className="text-sm">Selfie matches ID photo</span>
                        </label>
                        <label className="flex items-center gap-3 cursor-pointer">
                            <input type="checkbox" className="w-4 h-4 rounded border-white/20 bg-white/5" />
                            <span className="text-sm">All information is consistent across documents</span>
                        </label>
                    </div>
                </div>

                {/* Actions */}
                <div className="bg-gradient-to-br from-slate-900/50 to-slate-800/30 backdrop-blur-sm border border-white/10 rounded-lg p-6">
                    <h2 className="text-xl font-bold mb-4">Review Decision</h2>
                    <div className="flex gap-3">
                        <Button
                            onClick={handleApprove}
                            className="flex-1 bg-emerald-500 hover:bg-emerald-600"
                        >
                            <CheckCircle className="w-4 h-4 mr-2" />
                            Approve Verification
                        </Button>
                        <Button
                            onClick={() => setIsRejectModalOpen(true)}
                            variant="outline"
                            className="flex-1 text-red-400 border-red-400/50 hover:bg-red-500/10"
                        >
                            <XCircle className="w-4 h-4 mr-2" />
                            Reject Verification
                        </Button>
                    </div>
                </div>
            </div>

            {/* Reject Modal */}
            <Modal
                isOpen={isRejectModalOpen}
                onClose={() => setIsRejectModalOpen(false)}
                title="Reject Verification"
            >
                <div className="space-y-4">
                    <p className="text-sm text-slate-400">
                        Please provide a reason for rejecting this verification. The user will be notified.
                    </p>
                    <div>
                        <label className="text-xs font-medium text-slate-300 block mb-2">Rejection Reason</label>
                        <textarea
                            placeholder="Enter reason for rejection..."
                            value={rejectionReason}
                            onChange={(e) => setRejectionReason(e.target.value)}
                            className="w-full bg-slate-900 border border-white/10 rounded-md px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/50 min-h-[100px]"
                        />
                    </div>
                    <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4">
                        <p className="text-xs text-red-400">
                            <strong>Warning:</strong> This action will reject the user's KYC verification and they will need to resubmit their documents.
                        </p>
                    </div>
                    <div className="flex justify-end gap-2 mt-4">
                        <Button variant="ghost" onClick={() => setIsRejectModalOpen(false)}>
                            Cancel
                        </Button>
                        <Button
                            onClick={handleReject}
                            disabled={!rejectionReason}
                            className="bg-red-500 hover:bg-red-600 text-white"
                        >
                            Reject Verification
                        </Button>
                    </div>
                </div>
            </Modal>
        </div>
    )
}

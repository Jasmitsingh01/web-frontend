'use client'

import { useState } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft, CheckCircle, XCircle, Download, Eye, DollarSign } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Modal } from "@/components/ui/modal"
import { Input } from "@/components/ui/input"

export default function PaymentVerificationPage({ params }: { params: { id: string } }) {
    const router = useRouter()
    const [isRejectModalOpen, setIsRejectModalOpen] = useState(false)
    const [isAddBalanceModalOpen, setIsAddBalanceModalOpen] = useState(false)
    const [rejectionReason, setRejectionReason] = useState("")

    // Mock payment data
    const payment = {
        id: params.id,
        userName: "Mike Johnson",
        userEmail: "mike@example.com",
        userId: "3",
        amount: "$5,000",
        method: "Bank Transfer",
        status: "pending",
        submittedDate: "2024-03-15 10:30 AM",
        transactionId: "TXN-2024-03-15-001",
        bankDetails: {
            bankName: "Chase Bank",
            accountNumber: "****1234",
            routingNumber: "****5678",
            accountHolder: "Mike Johnson"
        },
        proof: {
            filename: "bank_receipt.pdf",
            uploadDate: "2024-03-15 10:30 AM"
        }
    }

    const handleApprove = () => {
        setIsAddBalanceModalOpen(true)
    }

    const handleAddBalance = () => {
        alert(`Payment approved and ${payment.amount} added to ${payment.userName}'s account`)
        setIsAddBalanceModalOpen(false)
        router.push("/admin")
    }

    const handleReject = () => {
        if (rejectionReason) {
            alert(`Payment rejected for ${payment.userName}\nReason: ${rejectionReason}`)
            setIsRejectModalOpen(false)
            router.push("/admin")
        }
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-950 via-emerald-950 to-slate-950 text-white">
            <div className="max-w-5xl mx-auto p-6">
                {/* Header */}
                <div className="mb-8">
                    <Button
                        variant="ghost"
                        onClick={() => router.back()}
                        className="mb-4 text-slate-400 hover:text-white"
                    >
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Back to Payments
                    </Button>
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-3xl font-bold mb-2">Payment Verification</h1>
                            <p className="text-slate-400">{payment.userName} - {payment.userEmail}</p>
                        </div>
                        <Badge variant="neutral">{payment.status}</Badge>
                    </div>
                </div>

                {/* Payment Summary */}
                <div className="mb-6 bg-gradient-to-br from-slate-900/50 to-slate-800/30 backdrop-blur-sm border border-white/10 rounded-lg p-6">
                    <h2 className="text-xl font-bold mb-4">Payment Details</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <div className="mb-4">
                                <p className="text-sm text-slate-400 mb-1">Amount</p>
                                <p className="text-3xl font-bold text-emerald-400">{payment.amount}</p>
                            </div>
                            <div className="mb-4">
                                <p className="text-sm text-slate-400 mb-1">Payment Method</p>
                                <p className="font-medium">{payment.method}</p>
                            </div>
                            <div className="mb-4">
                                <p className="text-sm text-slate-400 mb-1">Transaction ID</p>
                                <p className="font-medium font-mono text-sm">{payment.transactionId}</p>
                            </div>
                        </div>
                        <div>
                            <div className="mb-4">
                                <p className="text-sm text-slate-400 mb-1">User</p>
                                <p className="font-medium">{payment.userName}</p>
                                <p className="text-sm text-slate-400">{payment.userEmail}</p>
                            </div>
                            <div className="mb-4">
                                <p className="text-sm text-slate-400 mb-1">Submitted Date</p>
                                <p className="font-medium">{payment.submittedDate}</p>
                            </div>
                            <div className="mb-4">
                                <p className="text-sm text-slate-400 mb-1">Status</p>
                                <Badge variant="neutral">{payment.status}</Badge>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bank Details */}
                <div className="mb-6 bg-gradient-to-br from-slate-900/50 to-slate-800/30 backdrop-blur-sm border border-white/10 rounded-lg p-6">
                    <h2 className="text-xl font-bold mb-4">Bank Details</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <p className="text-sm text-slate-400 mb-1">Bank Name</p>
                            <p className="font-medium">{payment.bankDetails.bankName}</p>
                        </div>
                        <div>
                            <p className="text-sm text-slate-400 mb-1">Account Holder</p>
                            <p className="font-medium">{payment.bankDetails.accountHolder}</p>
                        </div>
                        <div>
                            <p className="text-sm text-slate-400 mb-1">Account Number</p>
                            <p className="font-medium font-mono">{payment.bankDetails.accountNumber}</p>
                        </div>
                        <div>
                            <p className="text-sm text-slate-400 mb-1">Routing Number</p>
                            <p className="font-medium font-mono">{payment.bankDetails.routingNumber}</p>
                        </div>
                    </div>
                </div>

                {/* Payment Proof */}
                <div className="mb-6 bg-gradient-to-br from-slate-900/50 to-slate-800/30 backdrop-blur-sm border border-white/10 rounded-lg p-6">
                    <h2 className="text-xl font-bold mb-4">Payment Proof</h2>
                    <div className="p-4 bg-white/5 rounded-lg">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="font-medium mb-1">Transaction Receipt</p>
                                <p className="text-sm text-slate-400">{payment.proof.filename}</p>
                                <p className="text-xs text-slate-500 mt-1">Uploaded: {payment.proof.uploadDate}</p>
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
                </div>

                {/* Verification Checklist */}
                <div className="mb-6 bg-gradient-to-br from-slate-900/50 to-slate-800/30 backdrop-blur-sm border border-white/10 rounded-lg p-6">
                    <h2 className="text-xl font-bold mb-4">Verification Checklist</h2>
                    <div className="space-y-3">
                        <label className="flex items-center gap-3 cursor-pointer">
                            <input type="checkbox" className="w-4 h-4 rounded border-white/20 bg-white/5" />
                            <span className="text-sm">Transaction receipt is clear and readable</span>
                        </label>
                        <label className="flex items-center gap-3 cursor-pointer">
                            <input type="checkbox" className="w-4 h-4 rounded border-white/20 bg-white/5" />
                            <span className="text-sm">Amount matches the submitted payment</span>
                        </label>
                        <label className="flex items-center gap-3 cursor-pointer">
                            <input type="checkbox" className="w-4 h-4 rounded border-white/20 bg-white/5" />
                            <span className="text-sm">Bank details match user's registered account</span>
                        </label>
                        <label className="flex items-center gap-3 cursor-pointer">
                            <input type="checkbox" className="w-4 h-4 rounded border-white/20 bg-white/5" />
                            <span className="text-sm">Transaction date is recent</span>
                        </label>
                        <label className="flex items-center gap-3 cursor-pointer">
                            <input type="checkbox" className="w-4 h-4 rounded border-white/20 bg-white/5" />
                            <span className="text-sm">No signs of tampering or fraud</span>
                        </label>
                    </div>
                </div>

                {/* Actions */}
                <div className="bg-gradient-to-br from-slate-900/50 to-slate-800/30 backdrop-blur-sm border border-white/10 rounded-lg p-6">
                    <h2 className="text-xl font-bold mb-4">Verification Decision</h2>
                    <div className="flex gap-3">
                        <Button
                            onClick={handleApprove}
                            className="flex-1 bg-emerald-500 hover:bg-emerald-600"
                        >
                            <CheckCircle className="w-4 h-4 mr-2" />
                            Approve & Add Balance
                        </Button>
                        <Button
                            onClick={() => setIsRejectModalOpen(true)}
                            variant="outline"
                            className="flex-1 text-red-400 border-red-400/50 hover:bg-red-500/10"
                        >
                            <XCircle className="w-4 h-4 mr-2" />
                            Reject Payment
                        </Button>
                    </div>
                </div>
            </div>

            {/* Add Balance Confirmation Modal */}
            <Modal
                isOpen={isAddBalanceModalOpen}
                onClose={() => setIsAddBalanceModalOpen(false)}
                title="Confirm Payment Approval"
            >
                <div className="space-y-4">
                    <p className="text-sm text-slate-400">
                        You are about to approve this payment and add the balance to the user's account.
                    </p>
                    <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-lg p-4">
                        <div className="space-y-2">
                            <div className="flex justify-between">
                                <span className="text-sm text-slate-400">User:</span>
                                <span className="text-sm font-medium">{payment.userName}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-sm text-slate-400">Amount:</span>
                                <span className="text-lg font-bold text-emerald-400">{payment.amount}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-sm text-slate-400">Method:</span>
                                <span className="text-sm font-medium">{payment.method}</span>
                            </div>
                        </div>
                    </div>
                    <p className="text-xs text-slate-500">
                        This action will mark the payment as verified and credit the amount to the user's account balance.
                    </p>
                    <div className="flex justify-end gap-2 mt-4">
                        <Button variant="ghost" onClick={() => setIsAddBalanceModalOpen(false)}>
                            Cancel
                        </Button>
                        <Button
                            onClick={handleAddBalance}
                            className="bg-emerald-500 hover:bg-emerald-600 text-white"
                        >
                            <DollarSign className="w-4 h-4 mr-2" />
                            Approve & Add Balance
                        </Button>
                    </div>
                </div>
            </Modal>

            {/* Reject Modal */}
            <Modal
                isOpen={isRejectModalOpen}
                onClose={() => setIsRejectModalOpen(false)}
                title="Reject Payment"
            >
                <div className="space-y-4">
                    <p className="text-sm text-slate-400">
                        Please provide a reason for rejecting this payment. The user will be notified.
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
                            <strong>Warning:</strong> This action will reject the payment and the user will need to resubmit.
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
                            Reject Payment
                        </Button>
                    </div>
                </div>
            </Modal>
        </div>
    )
}

'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Mail, User, Lock, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { OTPVerification } from '@/components/auth/OTPVerification'
import { signIn } from 'next-auth/react'
import { detectInputType } from '@/lib/validators'
import type { VerificationStep } from '@/types/auth'

export default function OpenAccountPage() {
    const [name, setName] = useState('')
    const [identifier, setIdentifier] = useState('')
    const [password, setPassword] = useState('')
    const [step, setStep] = useState<VerificationStep>('input')
    const [inputType, setInputType] = useState<'email' | 'phone'>('email')
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState('')
    const [agreedToTerms, setAgreedToTerms] = useState(false)
    const [showPassword, setShowPassword] = useState(false)

    // Detect input type when identifier changes
    useEffect(() => {
        if (identifier.trim()) {
            const type = detectInputType(identifier)
            if (type === 'email') {
                setShowPassword(true)
                setInputType('email')
            } else if (type === 'phone') {
                setShowPassword(false)
                setInputType('phone')
            } else {
                setShowPassword(false)
            }
        } else {
            setShowPassword(false)
        }
    }, [identifier])

    const handlePasswordSignup = async () => {
        setError('')

        if (!name.trim()) {
            setError('Please enter your name')
            return
        }

        if (!identifier || !password) {
            setError('Please enter email and password')
            return
        }

        if (!agreedToTerms) {
            setError('Please agree to the terms and conditions')
            return
        }

        setIsLoading(true)

        try {
            // In production, implement actual email/password account creation
            // For now, just show a message
            setTimeout(() => {
                setError('Email/password signup not yet implemented. Please use OTP.')
                setIsLoading(false)
            }, 1000)
        } catch (err) {
            setError('Signup failed. Please try again.')
            setIsLoading(false)
        }
    }

    const handleSendOTP = async () => {
        setError('')

        if (!name.trim()) {
            setError('Please enter your name')
            return
        }

        if (!agreedToTerms) {
            setError('Please agree to the terms and conditions')
            return
        }

        const type = detectInputType(identifier)
        if (type === 'unknown') {
            setError('Please enter a valid email or phone number')
            return
        }

        setIsLoading(true)
        setInputType(type)

        try {
            const response = await fetch('/api/auth/send-otp', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ identifier }),
            })

            const data = await response.json()

            if (data.success) {
                setStep('verify')
            } else {
                setError(data.message || 'Failed to send OTP')
            }
        } catch (err) {
            setError('Failed to send OTP. Please try again.')
        } finally {
            setIsLoading(false)
        }
    }

    const handleVerifyOTP = async (otp: string): Promise<boolean> => {
        try {
            const response = await fetch('/api/auth/verify-otp', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ identifier, code: otp }),
            })

            const data = await response.json()

            if (data.success) {
                // In production, you would create the user account here
                // For now, just redirect to admin
                window.location.href = '/admin'
                return true
            }
            return false
        } catch (err) {
            return false
        }
    }

    const handleResendOTP = async () => {
        await handleSendOTP()
    }

    const handleGoogleSignIn = async () => {
        await signIn('google', { callbackUrl: '/admin' })
    }

    if (step === 'verify') {
        return (
            <div className="min-h-screen flex items-center justify-center p-8 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-purple-500/5 to-pink-500/5" />
                <div className="absolute top-20 left-20 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-pulse" />
                <div className="absolute bottom-20 right-20 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000" />

                <div className="relative z-10">
                    <OTPVerification
                        identifier={identifier}
                        type={inputType}
                        onVerify={handleVerifyOTP}
                        onBack={() => setStep('input')}
                        onResend={handleResendOTP}
                    />
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen flex">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-purple-500/5 to-pink-500/5" />

            <div className="flex-1 flex items-center justify-center relative overflow-hidden">
                <div className="absolute top-20 left-20 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-pulse" />
                <div className="absolute bottom-20 right-20 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000" />

                <div className="relative w-full max-w-md z-10">
                    <Card className="shadow-2xl border-2">
                        <CardHeader className="space-y-1 text-center">
                            <CardTitle className="text-3xl font-bold bg-gradient-to-r from-primary via-purple-600 to-pink-600 bg-clip-text text-transparent">
                                Open Account
                            </CardTitle>
                            <CardDescription className="text-base">
                                Start your trading journey today
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            {/* Google Sign Up */}
                            <Button
                                onClick={handleGoogleSignIn}
                                variant="outline"
                                className="w-full h-11 text-base hover:scale-[1.02] transition-transform"
                                type="button"
                            >
                                <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                                </svg>
                                Sign up with Google
                            </Button>

                            <div className="relative">
                                <div className="relative flex justify-center text-xs uppercase">
                                    <span className="bg-background px-2 text-muted-foreground">
                                        Or continue with {showPassword ? 'email' : 'email/phone'}
                                    </span>
                                </div>
                            </div>

                            {/* Name Input */}
                            <div className="space-y-2">
                                <Label htmlFor="name">Full Name</Label>
                                <div className="relative">
                                    <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                    <Input
                                        id="name"
                                        type="text"
                                        placeholder="John Doe"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        className="pl-10 h-11"
                                    />
                                </div>
                            </div>

                            {/* Email/Phone Input */}
                            <div className="space-y-2">
                                <Label htmlFor="identifier">Email or Phone Number</Label>
                                <div className="relative">
                                    <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                    <Input
                                        id="identifier"
                                        type="text"
                                        placeholder="name@example.com or +1234567890"
                                        value={identifier}
                                        onChange={(e) => setIdentifier(e.target.value)}
                                        className="pl-10 h-11"
                                    />
                                </div>
                            </div>

                            {/* Password Field (only for email) */}
                            {showPassword && (
                                <div className="space-y-2 animate-in fade-in slide-in-from-top-2 duration-300">
                                    <Label htmlFor="password">Password</Label>
                                    <div className="relative">
                                        <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                        <Input
                                            id="password"
                                            type="password"
                                            placeholder="••••••••"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            className="pl-10 h-11"
                                        />
                                    </div>
                                    <p className="text-xs text-muted-foreground">
                                        Must be at least 8 characters
                                    </p>
                                </div>
                            )}

                            {/* Terms Checkbox */}
                            <div className="flex items-start space-x-2">
                                <input
                                    type="checkbox"
                                    id="terms"
                                    checked={agreedToTerms}
                                    onChange={(e) => setAgreedToTerms(e.target.checked)}
                                    className="mt-1 rounded border-gray-300"
                                />
                                <label htmlFor="terms" className="text-sm leading-none">
                                    I agree to the{' '}
                                    <Link href="/terms" className="text-primary hover:underline">
                                        Terms of Service
                                    </Link>{' '}
                                    and{' '}
                                    <Link href="/privacy" className="text-primary hover:underline">
                                        Privacy Policy
                                    </Link>
                                </label>
                            </div>

                            {error && (
                                <p className="text-sm text-destructive animate-shake">{error}</p>
                            )}

                            {/* Signup Buttons */}
                            {showPassword ? (
                                <div className="space-y-2">
                                    <Button
                                        onClick={handlePasswordSignup}
                                        className="w-full h-11 border-2 border-primary text-base group"
                                        disabled={isLoading || !name || !identifier || !password || !agreedToTerms}
                                    >
                                        {isLoading ? (
                                            'Creating Account...'
                                        ) : (
                                            <>
                                                Create Account with Password
                                                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                                            </>
                                        )}
                                    </Button>
                                    <Button
                                        onClick={handleSendOTP}
                                        variant="outline"
                                        className="w-full h-11 text-base"
                                        disabled={isLoading || !name || !identifier || !agreedToTerms}
                                    >
                                        Or verify with OTP instead
                                    </Button>
                                </div>
                            ) : (
                                <Button
                                    onClick={handleSendOTP}
                                    className="w-full h-11 border-2 border-primary text-base group"
                                    disabled={isLoading || !name || !identifier || !agreedToTerms}
                                >
                                    {isLoading ? (
                                        'Sending OTP...'
                                    ) : (
                                        <>
                                            Create Account
                                            <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                                        </>
                                    )}
                                </Button>
                            )}

                            <p className="text-center text-sm text-muted-foreground">
                                Already have an account?{' '}
                                <Link href="/auth/login" className="text-primary font-medium hover:underline">
                                    Sign in
                                </Link>
                            </p>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )
}

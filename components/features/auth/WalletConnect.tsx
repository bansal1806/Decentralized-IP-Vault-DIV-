"use client";

import { useAccount, useConnect, useDisconnect } from 'wagmi'
import { Button } from '@/components/ui/button'
import { injected } from 'wagmi/connectors'
import { useState, useEffect } from 'react'

export function WalletConnect() {
    const { address, isConnected } = useAccount()
    const { connect } = useConnect()
    const { disconnect } = useDisconnect()
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)
    }, [])

    if (mounted && isConnected) {
        return (
            <Button variant="outline" size="sm" onClick={() => disconnect()} className="font-mono">
                {address?.slice(0, 6)}...{address?.slice(-4)}
            </Button>
        )
    }

    return (
        <Button
            variant="default"
            size="sm"
            onClick={() => connect({ connector: injected() })}
        >
            Connect Wallet
        </Button>
    )
}

import React from 'react'
import { useState } from 'react'
import { Anchor } from '../components'

export default function Home() {
  return (
    <div className="container">
      <div className="color">
        <Anchor href="/leases" label="leases" />
      </div>
    </div>
  )
}

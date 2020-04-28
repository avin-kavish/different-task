import React from 'react'
import { useState } from 'react'
import { Anchor } from '../components'

export default function Home() {
  const [state, setState] = useState(false)

  return (
    <div className="container">
      <div className="color">
        <Anchor href="/leases" label="leases" />
      </div>
    </div>
  )
}

import type { NextPage } from 'next'
import Head from 'next/head'
import { Box } from '@mui/material'

import AssetsTable from '@/components/balances/AssetsTable'
import AssetsHeader from '@/components/balances/AssetsHeader'
import useBalances from '@/hooks/useBalances'
import { useState } from 'react'

import PagePlaceholder from '@/components/common/PagePlaceholder'
import NoAssetsIcon from '@/public/images/balances/no-assets.svg'
import HiddenTokenButton from '@/components/balances/HiddenTokenButton'
import CurrencySelect from '@/components/balances/CurrencySelect'
import TokenListSelect from '@/components/balances/TokenListSelect'

const Balances: NextPage = () => {
  const { error } = useBalances()
  const [showHiddenAssets, setShowHiddenAssets] = useState(false)
  const toggleShowHiddenAssets = () => setShowHiddenAssets((prev) => !prev)

  return (
    <>
      <Head>
        <title>Safe – Assets</title>
      </Head>

      <AssetsHeader>
        <Box display="flex" flexDirection="row" alignItems="center" gap={1}>
          <HiddenTokenButton showHiddenAssets={showHiddenAssets} toggleShowHiddenAssets={toggleShowHiddenAssets} />
          <TokenListSelect />
          <CurrencySelect />
        </Box>
      </AssetsHeader>

      <main>
        {!error ? (
          <AssetsTable setShowHiddenAssets={setShowHiddenAssets} showHiddenAssets={showHiddenAssets} />
        ) : (
          <PagePlaceholder img={<NoAssetsIcon />} text="There was an error loading your assets" />
        )}
      </main>
    </>
  )
}

export default Balances

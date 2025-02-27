import { useCurrentChain } from '@/hooks/useChains'
import { useAppDispatch, useAppSelector } from '@/store'
import { selectSettings, setTokenList, TOKEN_LISTS } from '@/store/settingsSlice'
import { FEATURES, hasFeature } from '@/utils/chains'
import type { SelectChangeEvent } from '@mui/material'
import { Box, SvgIcon, Tooltip, Typography, FormControl, InputLabel, Select, MenuItem } from '@mui/material'
import InfoIcon from '@/public/images/notifications/info.svg'
import ExternalLink from '@/components/common/ExternalLink'
import { OnboardingTooltip } from '@/components/common/OnboardingTooltip'

const LS_TOKENLIST_ONBOARDING = 'tokenlist_onboarding'

const TokenListLabel = {
  [TOKEN_LISTS.TRUSTED]: 'Default tokens',
  [TOKEN_LISTS.ALL]: 'All tokens',
}

const TokenListSelect = () => {
  const dispatch = useAppDispatch()
  const settings = useAppSelector(selectSettings)
  const chain = useCurrentChain()
  const hasDefaultTokenlist = chain && hasFeature(chain, FEATURES.DEFAULT_TOKENLIST)

  const handleSelectTokenList = (event: SelectChangeEvent<TOKEN_LISTS>) => {
    const selectedString = event.target.value as TOKEN_LISTS
    dispatch(setTokenList(selectedString))
  }

  if (!hasDefaultTokenlist) {
    return null
  }

  return (
    <FormControl size="small">
      <InputLabel id="tokenlist-select-label">Filter by</InputLabel>
      <OnboardingTooltip
        widgetLocalStorageId={LS_TOKENLIST_ONBOARDING}
        text="Missing tokens? Switch to “All tokens” to see more than the default tokens here."
      >
        <Select
          labelId="tokenlist-select-label"
          id="tokenlist-select"
          value={settings.tokenList}
          label="Tokenlist"
          onChange={handleSelectTokenList}
          renderValue={(value) => TokenListLabel[value]}
        >
          <MenuItem value={TOKEN_LISTS.TRUSTED}>
            <Box display="flex" flexDirection="row" gap="4px" alignItems="center">
              {TokenListLabel.TRUSTED}
              <Tooltip
                arrow
                title={
                  <Typography>
                    Learn more about{' '}
                    <ExternalLink href="https://help.safe.global/en/articles/6951406-default-token-list-local-hiding-of-spam-tokens">
                      default tokens
                    </ExternalLink>
                  </Typography>
                }
              >
                <span>
                  <SvgIcon sx={{ display: 'block' }} color="border" fontSize="small" component={InfoIcon}></SvgIcon>
                </span>
              </Tooltip>
            </Box>
          </MenuItem>
          <MenuItem value={TOKEN_LISTS.ALL}>{TokenListLabel.ALL}</MenuItem>
        </Select>
      </OnboardingTooltip>
    </FormControl>
  )
}

export default TokenListSelect

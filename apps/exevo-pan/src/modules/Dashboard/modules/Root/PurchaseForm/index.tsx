import { useCallback, useLayoutEffect, useRef, useState } from 'react'
import { useTranslations } from 'contexts/useTranslation'
import { toast } from 'react-hot-toast'
import { trpc } from 'lib/trpc'
import { useDebounce } from 'hooks'
import Image from 'next/image'
import {
  Button,
  CopyButton,
  Input,
  OptionButton,
  Stepper,
  TitledCard,
} from 'components/Atoms'
import { EditIcon } from 'assets/svgs'
import {
  calculateDiscountedExevoProPrice,
  randomCharacter,
  referralTracker,
} from 'utils'
import { advertising } from 'Constants'
import TibiaCoinsSrc from 'assets/tibiaCoins.gif'
import PixSrc from 'assets/pix.png'
import FromTo from './FromTo'
import { generateQrCode } from './utils'

const { BANK_CHARACTER } = advertising

type PurchaseFormProps = {
  email: string
  initialTxId?: string | null
  initialCharacter?: string | null
  confirmed?: boolean
  initialCoupon?: string | null
  initialDiscountPercent?: number | null
}

const PurchaseForm = ({
  email,
  initialTxId,
  initialCharacter,
  confirmed,
  initialCoupon,
  initialDiscountPercent,
}: PurchaseFormProps) => {
  const { common, dashboard } = useTranslations()

  const [pixMode, setPixMode] = useState(false)

  const [requestStatus, setRequestStatus] = useState<RequestStatus>(
    confirmed === false ? 'SUCCESSFUL' : 'IDLE',
  )

  const [formState, setFormState] = useState<{
    txId?: string | null
    character?: string | null
    pixUrl?: string | null
    qrCode?: string
    coupon: string
    discountPercent: number
  }>({
    txId: initialTxId,
    character: initialCharacter,
    coupon: initialCoupon ?? '',
    discountPercent: initialDiscountPercent ?? 0,
  })

  useLayoutEffect(() => {
    if (initialCharacter) return
    if (confirmed === false) {
      generateQrCode(email).then(({ qrCode, payload }) => {
        setPixMode(true)
        setFormState((prev) => ({ ...prev, qrCode, pixUrl: payload }))
      })
    }
  }, [])

  const debouncedCoupon = useDebounce(formState.coupon)

  const validCoupon = debouncedCoupon.length >= 3
  const checkCouponAction = trpc.checkProCoupon.useQuery(debouncedCoupon, {
    enabled: validCoupon,
    onSuccess: (foundDiscountPercent) =>
      setFormState((prev) => ({
        ...prev,
        discountPercent: foundDiscountPercent,
      })),
  })

  useLayoutEffect(() => {
    if (initialCoupon) return

    const lsCoupon = referralTracker.getFromLS().coupon
    if (!lsCoupon) return
    setFormState((prev) => ({ ...prev, coupon: lsCoupon }))
  }, [])

  const orderAction = trpc.proPayment.useMutation({
    onMutate: () => {
      setRequestStatus('LOADING')
    },
    onError: () => {
      setRequestStatus('ERROR')
      toast.error(common.genericError)
    },
    onSuccess: async ({ paymentData }) => {
      if (paymentData) {
        const data: typeof formState = {
          discountPercent: paymentData.discountPercent ?? 0,
          coupon: paymentData.coupon ?? '',
        }
        data.txId = paymentData.id

        if (paymentData.character) {
          data.character = paymentData.character
        } else {
          const { qrCode, payload } = await generateQrCode(email)
          data.qrCode = qrCode
          data.pixUrl = payload
        }

        setFormState(data)
      }

      setRequestStatus('SUCCESSFUL')
      toast.success(dashboard.PurchaseForm.orderReceived)
    },
  })

  const resetStep = useCallback(() => setRequestStatus('IDLE'), [])

  const isLoading = requestStatus === 'LOADING'
  const currentStep = requestStatus !== 'SUCCESSFUL' ? 0 : 1
  const isFinished = currentStep === 1

  const { current: randomNickname } = useRef(randomCharacter())

  const calculatedPrice = calculateDiscountedExevoProPrice(
    formState.discountPercent,
    pixMode ? 'PIX' : 'TIBIA_COINS',
  )

  return (
    <div className="grid w-full max-w-[360px] gap-8">
      <Stepper
        className="mx-auto w-full max-w-[240px]"
        isFinished={isFinished}
        currentStep={currentStep}
        steps={[
          { title: dashboard.PurchaseForm.order, onClick: resetStep },
          { title: dashboard.PurchaseForm.payment },
        ]}
      />
      <TitledCard
        variant="rounded"
        title={
          <h4>
            {currentStep === 0
              ? dashboard.PurchaseForm.order
              : dashboard.PurchaseForm.payment}
          </h4>
        }
      >
        <div className="text-tsm leading-tight">
          {requestStatus !== 'SUCCESSFUL' && (
            <div>
              <div className="-mx-3">
                <OptionButton
                  active={!pixMode}
                  aria-label="Tibia Coins"
                  onClick={() => setPixMode(false)}
                  icon={
                    <Image
                      alt="Tibia Coin"
                      src={TibiaCoinsSrc}
                      width="24"
                      height="24"
                      className="pixelated"
                    />
                  }
                >
                  Tibia Coins
                </OptionButton>
                <OptionButton
                  active={pixMode}
                  aria-label="Pix"
                  onClick={() => setPixMode(true)}
                  icon={
                    <Image
                      alt="Pix"
                      src={PixSrc}
                      width="24"
                      height="24"
                      className="pixelated"
                    />
                  }
                >
                  Pix
                </OptionButton>
              </div>

              <div
                role="none"
                className="bg-separator mt-1 mb-3 h-[1px] w-full opacity-50"
              />

              <Input
                label="Coupon"
                value={formState.coupon.toUpperCase()}
                onChange={(e) =>
                  setFormState((prev) => ({ ...prev, coupon: e.target.value }))
                }
                stateIcon={
                  validCoupon && checkCouponAction.isLoading
                    ? 'loading'
                    : formState.discountPercent > 0
                    ? 'valid'
                    : 'neutral'
                }
              />

              {!pixMode && (
                <FromTo
                  from={formState.character ?? ''}
                  to={BANK_CHARACTER}
                  tc={calculatedPrice}
                />
              )}

              <div className="mt-1 flex items-end gap-4">
                {pixMode ? (
                  <p className="self-center text-base font-bold">
                    <span className="text-tsm font-light tracking-wide">
                      {dashboard.PurchaseForm.total}
                    </span>{' '}
                    R$ {calculatedPrice},00
                  </p>
                ) : (
                  <Input
                    className="w-full"
                    name="character"
                    label={dashboard.PurchaseForm.paymentCharacterLabel}
                    placeholder={`e.g, '${randomNickname}'`}
                    value={formState.character ?? ''}
                    onChange={(e) => {
                      setFormState((prev) => ({
                        ...prev,
                        character: e.target.value,
                      }))
                      setRequestStatus('IDLE')
                    }}
                    enterKeyHint="send"
                    disabled={isLoading}
                    error={requestStatus === 'ERROR'}
                  />
                )}

                <Button
                  type="submit"
                  pill
                  className="ml-auto mb-[1px] !py-3"
                  loading={isLoading}
                  disabled={
                    !pixMode &&
                    (!formState.character || formState.character.length < 2)
                  }
                  onClick={() =>
                    orderAction.mutate(
                      pixMode
                        ? {}
                        : { character: formState.character as string },
                    )
                  }
                >
                  {dashboard.PurchaseForm.confirm}
                </Button>
              </div>
            </div>
          )}

          {requestStatus === 'SUCCESSFUL' && (
            <div className="grid gap-5">
              <strong className="text-txl tracking-wide">
                {dashboard.PurchaseForm.orderReceived} 🎉
              </strong>

              {!!formState.txId && (
                <div className="grid gap-2">
                  <p id="tx-id">{dashboard.PurchaseForm.transactionId}:</p>
                  <p
                    aria-labelledby="tx-id"
                    className="code mx-auto w-fit text-center"
                  >
                    {formState.txId}
                  </p>
                </div>
              )}

              <p>{dashboard.PurchaseForm.notice}</p>

              {pixMode ? (
                <div>
                  <span className="code flex items-center gap-1.5 break-all text-xs">
                    {formState.pixUrl}
                    <CopyButton
                      copyString={formState.pixUrl as string}
                      className="!bg-primary child:fill-onPrimary shrink-0"
                    />
                  </span>
                  <p className="text-s mb-1.5 mt-[22px] text-center">
                    {dashboard.PurchaseForm.qrCodeText}
                  </p>
                  <img
                    className="mx-auto block"
                    alt="QR Code"
                    src={formState.qrCode}
                    style={{ zoom: 1 / 2, imageRendering: 'pixelated' }}
                  />
                </div>
              ) : (
                <FromTo
                  className="mx-auto"
                  from={formState.character ?? ''}
                  to={BANK_CHARACTER}
                  tc={calculatedPrice}
                />
              )}

              <Button className="mx-auto" pill hollow onClick={resetStep}>
                <EditIcon className="h-4 w-4" />
                {dashboard.PurchaseForm.edit}
              </Button>
            </div>
          )}
        </div>
      </TitledCard>
    </div>
  )
}

export default PurchaseForm

import { useState, useCallback, useRef } from 'react'
import type { PaymentData } from '@prisma/client'
import { Input, Button, Stepper, TitledCard } from 'components/Atoms'
import { EditIcon } from 'assets/svgs'
import { randomCharacter } from 'utils'
import { endpoints } from 'Constants'
import FromTo from './FromTo'
import { PurchaseFormProps } from './types'

const BANK_CHARACTER = 'Ksu'

const PurchaseForm = ({ id, character, confirmed }: PurchaseFormProps) => {
  const [requestStatus, setRequestStatus] = useState<RequestStatus>(
    confirmed === false ? 'SUCCESSFUL' : 'IDLE',
  )
  const [from, setFrom] = useState(character)
  const [txId, setTxId] = useState(id)

  const onSubmit = useCallback(
    async (
      e: React.FormEvent<
        ExtendedHTMLFormElement<{ character: HTMLInputElement }>
      >,
    ) => {
      e.preventDefault()
      const { value } = e.currentTarget.elements.character

      if (!value) return

      setRequestStatus('LOADING')
      const response = await fetch(endpoints.SEND_PAYMENT, {
        method: 'PUT',
        body: JSON.stringify({ character: value }),
      })

      const { id: paymentId }: PaymentData = await response.json()
      setTxId(paymentId)

      const sucessful = response.status === 200
      setRequestStatus(sucessful ? 'SUCCESSFUL' : 'ERROR')
    },
    [],
  )

  const resetStep = useCallback(() => setRequestStatus('IDLE'), [])

  const isLoading = requestStatus === 'LOADING'
  const currentStep = requestStatus !== 'SUCCESSFUL' ? 0 : 1
  const isFinished = currentStep === 1

  const { current: randomNickname } = useRef(randomCharacter())

  return (
    <div className="grid w-full max-w-[360px] gap-8">
      <Stepper
        className="mx-auto w-full max-w-[240px]"
        isFinished={isFinished}
        currentStep={currentStep}
        steps={[{ title: 'Order', onClick: resetStep }, { title: 'Payment' }]}
      />
      <TitledCard title={<h4>{currentStep === 0 ? 'Order' : 'Payment'}</h4>}>
        <div className="text-tsm p-3 leading-tight">
          {requestStatus !== 'SUCCESSFUL' ? (
            <div className="grid gap-3">
              <FromTo from={from} to={BANK_CHARACTER} />

              <form onSubmit={onSubmit} className="flex items-end gap-4">
                <Input
                  className="w-full"
                  name="character"
                  label="Sending coins character"
                  placeholder={`e.g, '${randomNickname}'`}
                  noAlert
                  defaultValue={character}
                  onChange={(e) => setFrom(e.target.value.trim())}
                  enterKeyHint="send"
                  disabled={isLoading}
                />
                <Button
                  type="submit"
                  pill
                  className="mb-[1px] py-3"
                  loading={isLoading}
                  disabled={!from}
                >
                  Confirm
                </Button>
              </form>
            </div>
          ) : (
            <div className="grid gap-5">
              <strong className="text-txl tracking-wide">
                Your order was received! 🎉
              </strong>

              {txId && (
                <div className="grid gap-2">
                  <p>Transaction ID:</p>
                  <p className="code mx-auto w-fit text-center">{txId}</p>
                </div>
              )}

              <p>
                Your purchase will be delivered right after your payment is
                confirmed. If your order can&apos;t be completed, your coins
                will be returned.
              </p>

              <FromTo className="mx-auto" from={from} to={BANK_CHARACTER} />

              <Button className="mx-auto" pill hollow onClick={resetStep}>
                <EditIcon className="h-4 w-4" />
                Edit your order
              </Button>
            </div>
          )}
        </div>
      </TitledCard>
    </div>
  )
}

export default PurchaseForm

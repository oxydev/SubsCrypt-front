import React, { useContext } from 'react'
import localData from '../../../data/sunscryptionPlans.json'
import * as utils from '../../../utilities/utilityFunctions'
import { getWalletInjector, refundPlan, renewPlan } from '../../../dataFunctions/getData'
import { UserContext } from '../../../context/store'
import data from '../../../data/testData/providerAddress.json'

export default function UserPlanCard (props) {
  const plan = props.plan.plan
  const index = props.index
  const localPlans = localData.userPlans[index]
  const { globalState, dispatch } = useContext(UserContext)

  const walletAddress = globalState.wallets[1].address
  const providerAddress = data.providerAddress
  // console.log(globalState.wallets[1])
  const injector = getWalletInjector(globalState.wallets[1])

  function handleRefund () {
    refundPlan(walletAddress, injector, callback, providerAddress, 0)
  }

  function handleRenew () {
    // console.log(injector)
    renewPlan(walletAddress, injector, callback, providerAddress, 0, ['value1'])
  }

  function callback (
    { events = [], status }) {
    console.log('Transaction status:', status.type)

    if (status.isInBlock) {
      console.log('Included at block hash', status.asInBlock.toHex())
      console.log('Events:')
      console.log(events)
      events.forEach(({ event: { data, method, section }, phase }) => {
        console.log('\t', phase.toString(), `: ${section}.${method}`, data.toString())
      })
    } else if (status.isFinalized) {
      console.log('Finalized block hash', status.asFinalized.toHex())
    }
  }

  return (
    <section className="UserPlanCard">
      <img className="UserPlan-logo" src={localPlans.logoURL}/>
      <div className="UserPlan-specs">
        <p className="UserPlan-name">{localPlans.name}</p>
        <p className="UserPlan-Provider">{localPlans.provider}</p>
        <div className="UserPlan-featurBox">
          <h6>Duration</h6>
          <p>{utils.duration(parseInt(plan.duration.replace(/,/g, '')))}</p>
        </div>
        <div className="UserPlan-featurBox">
          <h6>Refund Policy</h6>
          <p>{'% ' + plan.max_refund_permille_policy + ' Refund'}</p>
        </div>
      </div>
      <div className="UserPlan-specs">
        <p className="UserPlan-desc">{localPlans.description}</p>
        <div className="UserPlan-featurBox">
          <h6>Activation date</h6>
          <p>{utils.timeStamptoDate(parseInt(props.plan.subscription_time.replace(/,/g, '')))}</p>
        </div>
        <div className="UserPlan-featurBox">
          <h6>Expires on</h6>
          <p>
            {utils.timeStamptoDate(
              parseInt(props.plan.subscription_time.replace(/,/g, '')) +
              parseInt(plan.duration.replace(/,/g, ''))
            )}
          </p>
        </div>
      </div>
      <div className="UserPlan-specs">
        <div className="UserPlan-rate">
          <h6>Rate this provider</h6>
          <p>{localPlans.rateAmmount}</p>
          <p>{localPlans.rateNumber}</p>
        </div>
        <div className="UsePlanPercentage"></div>
        <p className="UsePlan-useAnnounce">
          You have used{' '}
          {'%' +
          utils.usePercentage(
            parseInt(props.plan.subscription_time.replace(/,/g, '')),
            parseInt(plan.duration.replace(/,/g, ''))
          )}{' '}
          of the service Refundable amount: {plan.refundAmmount}
        </p>
        <div className="UserPlan-PayPart">
          <div className="UserPlan-payMethod">
            <label>Pay with</label>
            <select className="UserPlan-coinSelect">
              <option value="coin1">coin1</option>
              <option value="coin2">coin2</option>
            </select>
          </div>
          <button className="UserPlan-refundBtn" onClick={handleRefund}>
            Refund
          </button>
          <button className="UserPlan-renewBtn" onClick={handleRenew}>
            Renew
          </button>
        </div>
      </div>
    </section>
  )
}

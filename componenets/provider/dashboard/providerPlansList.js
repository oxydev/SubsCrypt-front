import React, { useContext } from 'react'
import PlanCard from '../../common/planCard'
import { UserContext } from '../../../context/store'
import { useRouter } from 'next/router'

//The component for generating the provider plan lists
export default function ProviderPlansList () {
  const router = useRouter()
  const { globalState } = useContext(UserContext)

  let plans = []
  if (globalState.providerPlans) {
    plans.push(...globalState.providerPlans)
  }
  console.log(plans)
  const plansCard = plans.map((item, index) => (
    <PlanCard key={'providerPlan' + index} plan={item} index={index} type="provider"
              address={globalState.user.userWallet.address}/>
  ))
  return (
    <section className="ProviderPlansList">
      <header>
        <h1>Your Plans</h1>
        <p>Total Plans: {plans.length}</p>
        <button
          onClick={(e) => {
            e.preventDefault()
            router.push('/provider/addnewplan')
          }}
          className="ProviderPlansList-addPlanBtn"
        >
          Add a Plan
        </button>
      </header>
      <div>{plansCard}</div>
    </section>
  )
}

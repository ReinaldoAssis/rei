import React, { useRef, useState } from 'react'

export default function NewsletterSub() {
  // 1. Create a reference to the input so we can fetch/clear it's value.
  const inputEl = useRef(null)
  // 2. Hold a message in state to handle the response from our API.
  const [message, setMessage] = useState('')
  const [subed, setSubed] = useState(false)

  const subscribe = async (e) => {
    e.preventDefault()

    // 3. Send a request to our API with the user's email address.
    const res = await fetch('/api/newsletter', {
      body: JSON.stringify({
        email: inputEl.current.value,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
    })

    const { error } = await res.json()

    setSubed(true)

    if (error) {
      // 4. If there was an error, update the message in state.
      setMessage(error)

      return
    }

    // 5. Clear the input value and show a success message.
    inputEl.current.value = ''
    setMessage('Success! 🎉 You are now subscribed to the newsletter.')
  }

  return (
    <div className="divide-y">
      <div className="pt-6 pb-8 space-y-2 md:space-y-5">
        <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
          Subscribe to Newsletter
        </h1>
        <h6>I'll only send emails when new content is posted. No spam :D</h6>
        <div className="relative max-w-lg"></div>
        <form onSubmit={subscribe}>
          <label className="text-lg md:text-lg font-bold mb-11" htmlFor="email-input">
            {'Email Address'}
          </label>
          <input
            id="email-input"
            name="email"
            placeholder="you@awesome.com"
            ref={inputEl}
            required
            type="email"
            className="block w-3/5 px-4 py-2 text-gray-900 bg-white border border-gray-300 rounded-md dark:border-gray-900 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:text-gray-100"
          />

          <button
            className=" bg-indigo-600 btn transform transition duration-300 hover:scale-105 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-full"
            type="submit"
            style={{ marginTop: '20px' }}
          >
            {'✨ Subscribe 💌'}
          </button>

          <h6 style={{ marginTop: '10px' }}>
            {subed ? 'Success! 🎉 You are now subscribed to the newsletter.' : ''}
          </h6>
        </form>
      </div>
    </div>
  )
}

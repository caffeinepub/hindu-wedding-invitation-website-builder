import { useState } from 'react';
import { useSubmitRSVP } from '../../hooks/useQueries';

interface RSVPFormProps {
  inviteId: string;
  coupleNames: string;
  thankYouMessage?: string;
}

export default function RSVPForm({ inviteId, coupleNames, thankYouMessage }: RSVPFormProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [attendance, setAttendance] = useState<boolean>(true);
  const [guests, setGuests] = useState(1);
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const submitRSVP = useSubmitRSVP();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    submitRSVP.mutate(
      {
        id: inviteId,
        rsvp: {
          name,
          attendance,
          guests: BigInt(guests),
          message,
        },
      },
      {
        onSuccess: () => setSubmitted(true),
      }
    );
  };

  if (submitted) {
    return (
      <div className="text-center py-8 px-4">
        <div className="text-4xl mb-4">🙏</div>
        <h3 className="text-2xl font-bold mb-2" style={{ color: '#1a1a1a' }}>
          Thank You!
        </h3>
        <p style={{ color: '#3a3a3a' }}>
          {thankYouMessage ||
            `Your RSVP for ${coupleNames}'s wedding has been received. We look forward to celebrating with you!`}
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {/* Name */}
      <div>
        <label
          htmlFor="rsvp-name"
          className="block text-sm font-semibold mb-1"
          style={{ color: '#1a1a1a' }}
        >
          Your Name <span style={{ color: '#c0392b' }}>*</span>
        </label>
        <input
          id="rsvp-name"
          type="text"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter your full name"
          className="w-full px-3 py-2 rounded-md border text-sm focus:outline-none focus:ring-2 focus:ring-amber-400 focus:ring-offset-1"
          style={{
            backgroundColor: '#ffffff',
            color: '#1a1a1a',
            borderColor: '#d1d5db',
            caretColor: '#1a1a1a',
          }}
        />
      </div>

      {/* Email */}
      <div>
        <label
          htmlFor="rsvp-email"
          className="block text-sm font-semibold mb-1"
          style={{ color: '#1a1a1a' }}
        >
          Email Address
        </label>
        <input
          id="rsvp-email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="your@email.com"
          className="w-full px-3 py-2 rounded-md border text-sm focus:outline-none focus:ring-2 focus:ring-amber-400 focus:ring-offset-1"
          style={{
            backgroundColor: '#ffffff',
            color: '#1a1a1a',
            borderColor: '#d1d5db',
            caretColor: '#1a1a1a',
          }}
        />
      </div>

      {/* Attendance */}
      <div>
        <p className="block text-sm font-semibold mb-2" style={{ color: '#1a1a1a' }}>
          Will you attend? <span style={{ color: '#c0392b' }}>*</span>
        </p>
        <div className="flex gap-4 flex-wrap">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name="attendance"
              checked={attendance === true}
              onChange={() => setAttendance(true)}
              className="w-4 h-4 accent-amber-600"
            />
            <span className="text-sm font-medium" style={{ color: '#1a1a1a' }}>
              Yes, I'll be there! 🎉
            </span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name="attendance"
              checked={attendance === false}
              onChange={() => setAttendance(false)}
              className="w-4 h-4 accent-amber-600"
            />
            <span className="text-sm font-medium" style={{ color: '#1a1a1a' }}>
              Sorry, can't make it
            </span>
          </label>
        </div>
      </div>

      {/* Guest Count */}
      {attendance && (
        <div>
          <label
            htmlFor="rsvp-guests"
            className="block text-sm font-semibold mb-1"
            style={{ color: '#1a1a1a' }}
          >
            Number of Guests
          </label>
          <select
            id="rsvp-guests"
            value={guests}
            onChange={(e) => setGuests(Number(e.target.value))}
            className="w-full px-3 py-2 rounded-md border text-sm focus:outline-none focus:ring-2 focus:ring-amber-400 focus:ring-offset-1"
            style={{
              backgroundColor: '#ffffff',
              color: '#1a1a1a',
              borderColor: '#d1d5db',
            }}
          >
            {[1, 2, 3, 4, 5].map((n) => (
              <option
                key={n}
                value={n}
                style={{ color: '#1a1a1a', backgroundColor: '#ffffff' }}
              >
                {n} {n === 1 ? 'Guest' : 'Guests'}
              </option>
            ))}
          </select>
        </div>
      )}

      {/* Message */}
      <div>
        <label
          htmlFor="rsvp-message"
          className="block text-sm font-semibold mb-1"
          style={{ color: '#1a1a1a' }}
        >
          Message for the Couple
        </label>
        <textarea
          id="rsvp-message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Share your wishes or any special requests..."
          rows={3}
          className="w-full px-3 py-2 rounded-md border text-sm focus:outline-none focus:ring-2 focus:ring-amber-400 focus:ring-offset-1 resize-none"
          style={{
            backgroundColor: '#ffffff',
            color: '#1a1a1a',
            borderColor: '#d1d5db',
            caretColor: '#1a1a1a',
          }}
        />
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={submitRSVP.isPending || !name.trim()}
        className="w-full py-3 px-6 rounded-md font-semibold text-sm transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        style={{
          backgroundColor: '#b45309',
          color: '#ffffff',
        }}
      >
        {submitRSVP.isPending ? 'Sending...' : 'Send RSVP 💌'}
      </button>

      {submitRSVP.isError && (
        <p className="text-sm text-center" style={{ color: '#c0392b' }}>
          Something went wrong. Please try again.
        </p>
      )}
    </form>
  );
}

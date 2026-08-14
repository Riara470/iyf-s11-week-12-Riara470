import { useState } from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import { Users, BookOpen, Calendar, HelpCircle, MessageSquare, Shield, Megaphone, ArrowLeft } from 'lucide-react'

// Home Page
function HomePage() {
  const responsibilities = [
    { icon: Users, title: "Volunteer Opportunities", path: "/volunteer" },
    { icon: BookOpen, title: "Mentorship Module", path: "/mentorship" },
    { icon: Calendar, title: "Community Events", path: "/events" },
    { icon: HelpCircle, title: "Help Center", path: "/help" },
    { icon: MessageSquare, title: "FAQs", path: "/faqs" },
    { icon: MessageSquare, title: "Feedback System", path: "/feedback" },
    { icon: Shield, title: "Report Abuse Feature", path: "/report" },
    { icon: Megaphone, title: "Community Announcements", path: "/announcements" },
  ]

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg p-8">
      <section className="mb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {responsibilities.map(({ icon: Icon, title, path }) => (
            <Link 
              key={title} 
              to={path}
              className="flex items-center gap-3 p-4 bg-indigo-50 hover:bg-indigo-100 rounded-lg transition"
            >
              <Icon className="text-indigo-600" size={20} /> 
              <span className="font-medium">{title}</span>
            </Link>
          ))}
        </div>
      </section>
    </div>
  )
}

function FeaturePage({ title, fields = [], submitLabel = 'Submit' }) {
  const initialState = Object.fromEntries(fields.map((field) => [field.name, '']))
  const [formData, setFormData] = useState(initialState)
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (event) => {
    const { name, value } = event.target
    setFormData((previous) => ({ ...previous, [name]: value }))
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    setSubmitted(true)
  }

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg p-8">
      <Link to="/" className="flex items-center gap-2 text-indigo-600 mb-6 hover:underline">
        <ArrowLeft size={18} /> Back to Home
      </Link>

      <h1 className="text-3xl font-bold text-gray-800 mb-4">{title}</h1>

      <form onSubmit={handleSubmit} className="space-y-4 border-t border-gray-200 pt-6">
        {fields.map((field) => (
          <div key={field.name} className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">{field.label}</label>
            {field.type === 'textarea' ? (
              <textarea
                name={field.name}
                value={formData[field.name] || ''}
                onChange={handleChange}
                placeholder={field.placeholder}
                rows="4"
                className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            ) : (
              <input
                type={field.type || 'text'}
                name={field.name}
                value={formData[field.name] || ''}
                onChange={handleChange}
                placeholder={field.placeholder}
                className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            )}
          </div>
        ))}

        <button
          type="submit"
          className="bg-indigo-600 text-white px-5 py-3 rounded-lg font-medium hover:bg-indigo-700 transition"
        >
          {submitLabel}
        </button>

        {submitted && (
          <p className="mt-3 rounded-lg bg-green-50 border border-green-200 text-green-700 px-4 py-3">
            Thank you! Your {title.toLowerCase()} request has been submitted successfully.
          </p>
        )}
      </form>
    </div>
  )
}

function App() {
  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route
          path="/volunteer"
          element={
            <FeaturePage
              title="Volunteer Opportunities"
              description="Support the community by joining projects, helping events, and contributing your time where it matters most."
              items={[
                { title: 'Community Projects', text: 'Match volunteers with events, cleanup drives, mentoring sessions, and local support initiatives.' },
                { title: 'Role Matching', text: 'Assign people to roles based on skills, availability, and interest areas.' },
                { title: 'Impact Tracking', text: 'Track hours and participation to celebrate contributions and improve engagement.' },
              ]}
              fields={[
                { name: 'name', label: 'Full name', placeholder: 'Enter your name' },
                { name: 'interest', label: 'Area of interest', placeholder: 'e.g. event support, outreach, mentoring' },
                { name: 'details', label: 'Availability and notes', type: 'textarea', placeholder: 'Tell us when you are available and how you would like to help.' },
              ]}
              submitLabel="Submit volunteer request"
            />
          }
        />
        <Route
          path="/mentorship"
          element={
            <FeaturePage
              title="Mentorship Module"
              description="Create meaningful learning relationships that help new members grow and thrive within the community."
              items={[
                { title: 'Mentor Matching', text: 'Pair learners with experienced members based on interests, goals, and expertise.' },
                { title: 'Learning Sessions', text: 'Schedule 1:1 meetings, workshops, and guided project support.' },
                { title: 'Progress Check-ins', text: 'Follow milestones and maintain accountability for continued growth.' },
              ]}
              fields={[
                { name: 'name', label: 'Your name', placeholder: 'Enter your full name' },
                { name: 'goal', label: 'Mentorship goal', placeholder: 'What would you like to learn or improve?' },
                { name: 'details', label: 'Message', type: 'textarea', placeholder: 'Share your goals, experience level, and preferred support.' },
              ]}
              submitLabel="Send mentorship request"
            />
          }
        />
        <Route
          path="/events"
          element={
            <FeaturePage
              title="Community Events"
              description="Organize and manage gatherings that keep members informed, connected, and actively engaged."
              items={[
                { title: 'Event Calendar', text: 'Publish upcoming workshops, meetups, awareness campaigns, and social events.' },
                { title: 'RSVP Tracking', text: 'Allow members to confirm attendance and view event updates in real time.' },
                { title: 'Event Highlights', text: 'Share recaps and photos to keep the community excited for future activities.' },
              ]}
              fields={[
                { name: 'name', label: 'Event organizer', placeholder: 'Your name or team name' },
                { name: 'eventName', label: 'Event name', placeholder: 'Name of the event' },
                { name: 'details', label: 'Event details', type: 'textarea', placeholder: 'Add the date, agenda, location, and any notes for attendees.' },
              ]}
              submitLabel="Save event"
            />
          }
        />
        <Route
          path="/help"
          element={
            <FeaturePage
              title="Help Center"
              description="Offer clear support resources so members can find answers quickly when they need help."
              items={[
                { title: 'Guides & Tutorials', text: 'Provide a library of onboarding content, troubleshooting tips, and how-to guides.' },
                { title: 'Support Requests', text: 'Let users submit issues and follow up until they receive a helpful resolution.' },
                { title: 'Knowledge Base', text: 'Keep important information organized and easy to access for everyone.' },
              ]}
              fields={[
                { name: 'name', label: 'Your name', placeholder: 'Enter your name' },
                { name: 'issue', label: 'Issue type', placeholder: 'e.g. login, account access, technical issue' },
                { name: 'details', label: 'Describe the problem', type: 'textarea', placeholder: 'Tell us what happened and what you need help with.' },
              ]}
              submitLabel="Submit help request"
            />
          }
        />
        <Route
          path="/faqs"
          element={
            <FeaturePage
              title="FAQs"
              description="Reduce confusion by answering common questions in a simple, searchable format."
              items={[
                { title: 'Common Questions', text: 'Cover topics like signup, access, safety, and community guidelines.' },
                { title: 'Quick Answers', text: 'Give fast explanations that help members self-serve without needing support tickets.' },
                { title: 'Improved Visibility', text: 'Keep important details visible and easy to understand for new users.' },
              ]}
              fields={[
                { name: 'question', label: 'Your question', placeholder: 'Ask something you want answered' },
                { name: 'email', label: 'Email address', type: 'email', placeholder: 'name@example.com' },
                { name: 'details', label: 'Additional details', type: 'textarea', placeholder: 'Add more context so we can answer clearly.' },
              ]}
              submitLabel="Submit question"
            />
          }
        />
        <Route
          path="/feedback"
          element={
            <FeaturePage
              title="Feedback System"
              description="Collect member input and make it easy to understand what the community needs most."
              items={[
                { title: 'Idea Submission', text: 'Allow members to share feature ideas, concerns, and suggestions for improvements.' },
                { title: 'Response Tracking', text: 'Show follow-up actions to build trust and keep communication transparent.' },
                { title: 'Improvement Loop', text: 'Turn feedback into priorities and help the platform evolve with the community.' },
              ]}
              fields={[
                { name: 'name', label: 'Name', placeholder: 'Enter your name' },
                { name: 'email', label: 'Email address', type: 'email', placeholder: 'name@example.com' },
                { name: 'message', label: 'Your feedback', type: 'textarea', placeholder: 'Write your feedback, suggestion, or concern here...' },
              ]}
              submitLabel="Send feedback"
            />
          }
        />
        <Route
          path="/report"
          element={
            <FeaturePage
              title="Report Abuse Feature"
              description="Protect the community by making reporting easy, clear, and safe for everyone involved."
              items={[
                { title: 'Safe Reporting', text: 'Give members a straightforward way to flag misconduct, abuse, or unsafe behavior.' },
                { title: 'Moderation Workflow', text: 'Route reports to admins so issues can be reviewed and actioned quickly.' },
                { title: 'Trust & Safety', text: 'Strengthen a healthy, respectful environment where people feel protected.' },
              ]}
              fields={[
                { name: 'name', label: 'Reporter name', placeholder: 'Enter your name' },
                { name: 'subject', label: 'Report subject', placeholder: 'e.g. harassment, unsafe behavior, suspicious activity' },
                { name: 'details', label: 'Describe the issue', type: 'textarea', placeholder: 'Share what happened, when it happened, and who was involved.' },
              ]}
              submitLabel="Submit report"
            />
          }
        />
        <Route
          path="/announcements"
          element={
            <FeaturePage
              title="Community Announcements"
              description="Keep everyone informed with updates, opportunities, and important reminders in one place."
              items={[
                { title: 'Key Updates', text: 'Share news about community events, policies, launches, and opportunities.' },
                { title: 'Audience Targeting', text: 'Send information to the right groups to keep communication relevant and useful.' },
                { title: 'Engagement Boost', text: 'Encourage participation by highlighting what is happening and why it matters.' },
              ]}
              fields={[
                { name: 'title', label: 'Announcement title', placeholder: 'Enter the title of the announcement' },
                { name: 'audience', label: 'Audience', placeholder: 'Who should see this announcement?' },
                { name: 'details', label: 'Announcement text', type: 'textarea', placeholder: 'Write the message for the community here.' },
              ]}
              submitLabel="Publish announcement"
            />
          }
        />
      </Routes>
    </div>
  )
}

export default App
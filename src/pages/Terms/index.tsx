import { FC } from 'react'
import { useTranslation } from 'react-i18next'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

import FadeIn from '../../components/FadeIn'
import { Header } from '../../components/common/Header'

export const TermsPage: FC = () => {
  const { t } = useTranslation(['common', 'login'])

  const customRenderers = {
    h1: ({ ...props }) => <h1 className="text-4xl font-bold mb-4" {...props} />,
    h2: ({ ...props }) => (
      <h2 className="text-3xl font-semibold mb-3" {...props} />
    ),
    p: ({ ...props }) => (
      <p className="text-lg mb-2 leading-relaxed" {...props} />
    ),
    ul: ({ ...props }) => (
      <ul className="list-disc list-inside mb-4" {...props} />
    ),
    li: ({ ...props }) => <li className="mb-1" {...props} />,
    a: ({ ...props }) => (
      <a className="text-blue-500 hover:underline" {...props} />
    ),
    blockquote: ({ ...props }) => (
      <blockquote
        className="border-l-4 border-gray-300 pl-4 italic text-gray-700"
        {...props}
      />
    ),
  }

  return (
    <div className="pb-32">
      <header className="flex gap-5">
        <Header buttonBack />
      </header>
      <FadeIn className="container mx-auto py-10">
        <ReactMarkdown components={customRenderers} remarkPlugins={[remarkGfm]}>
          {markdown}
        </ReactMarkdown>
      </FadeIn>
    </div>
  )
}

const markdown = `# 🌟 Terms & Conditions - Pet's Love 🌟

_Last Updated: 29-09-2021_  

Welcome to **Pet's Love**! 🐾 These terms and conditions outline the rules and regulations for using the Pet's Love App (hereafter referred to as "the App" or "the Service"). By accessing or using the App, you agree to comply with and be bound by the following terms. If you disagree with any part of these terms, please do not use our App.

## 1. Acceptance of Terms

By creating an account or accessing the App, you accept and agree to be bound by these Terms & Conditions and our Privacy Policy. If you do not agree with these terms, you should not use the App.

## 2. User Accounts

- **Eligibility**: You must be at least 18 years old to use the App. By registering for an account, you represent that you meet this age requirement. ❤️
- **Account Security**: You are responsible for maintaining the confidentiality of your account credentials. You agree to notify us immediately if you suspect unauthorized access to your account.
- **Account Information**: You must provide accurate and complete information when creating your account. You are responsible for updating your information if it changes. 📝

## 3. Use of the App

- **Personal Use**: The App is intended for personal, non-commercial use only. You may not use the App for any commercial purpose without our express written consent. 
- **Prohibited Activities**: Users agree not to engage in any of the following activities:
  - Violating any local, state, national, or international law or regulation.
  - Posting or transmitting any material that is fraudulent, misleading, defamatory, obscene, or otherwise objectionable.
  - Using the App to distribute spam or unsolicited messages.
  - Attempting to interfere with the security or functionality of the App.
  - Impersonating any person or entity or falsely representing your affiliation with any person or entity. 🚫

## 4. Content and Intellectual Property

- **User-Generated Content**: By submitting content (e.g., text, photos) to the App, you grant Pet's Love a non-exclusive, royalty-free, worldwide, and transferable license to use, reproduce, modify, distribute, and display your content in connection with the Service. 📸
- **Prohibited Content**: Users must not submit any content that is illegal, harmful, abusive, or otherwise inappropriate. Pet's Love reserves the right to remove any content that violates these terms or is otherwise objectionable.
- **Intellectual Property**: All content, trademarks, logos, and other intellectual property rights in the App are owned by Pet's Love or its licensors. You may not use any of our intellectual property without prior written permission. 💡

## 5. Privacy Policy

Your use of the App is also governed by our [Privacy Policy](#), which explains how we collect, use, and protect your personal information. Please review our Privacy Policy carefully. 🔒

## 6. Termination

Pet's Love reserves the right to suspend or terminate your account and access to the App at any time, without notice, for any reason, including but not limited to violations of these Terms & Conditions. 

## 7. Limitation of Liability

To the fullest extent permitted by law, Pet's Love shall not be liable for any indirect, incidental, special, consequential, or punitive damages, or any loss of profits or revenues, whether incurred directly or indirectly, or any loss of data, use, goodwill, or other intangible losses, resulting from:
- Your use of or inability to use the App.
- Unauthorized access to or alteration of your transmissions or data.
- Any other matter relating to the App. 💔


## 8. Dispute Resolution

Any disputes arising out of or relating to these Terms & Conditions or the use of the App shall be resolved through binding arbitration in accordance with the rules of the [Arbitration Association] in [Jurisdiction]. Each party shall bear its own costs and expenses. ⚖️

## 9. Governing Law

These Terms & Conditions are governed by and construed in accordance with the laws of [Your Country/State], without regard to its conflict of law principles. 🌍

## 10. Changes to Terms & Conditions

We reserve the right to update or modify these Terms & Conditions at any time. Any changes will be effective immediately upon posting the updated terms in the App. Your continued use of the App after such changes constitutes your acceptance of the new Terms & Conditions. 🔄

## 11. Contact Information

If you have any questions or concerns about these Terms & Conditions, please contact us at alexrobainaph@gmail.com. 💌

---

Argentina, Mendoza

  `

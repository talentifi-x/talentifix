import React from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function PrivacyPolicyPage() {
  return (
    <main className="w-full bg-white flex flex-col items-center">
      {/* Hero Section */}
      <section className="w-full bg-gradient-to-r from-[#0000FF] to-[#000099] py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-6 md:px-8">
          <Link 
            href="/" 
            className="inline-flex items-center gap-2 text-white/80 hover:text-white transition-colors mb-6"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-notch text-white">
            Privacy Policy
          </h1>
          <p className="mt-4 text-lg md:text-xl text-white/80 max-w-2xl">
            Your privacy is important to us. This policy explains how we collect, use, and protect your information.
          </p>
        </div>
      </section>

      {/* Content Section */}
      <section className="w-full max-w-5xl mx-auto px-6 md:px-8 py-16 md:py-20">
        <div className="prose prose-lg max-w-none">
          
          {/* Effective Date */}
          <p className="text-gray-500 text-sm mb-8">
            <strong>Effective Date:</strong> January 28, 2025
          </p>

          <p className="text-gray-700 leading-relaxed mb-8">
            This privacy policy (&quot;Privacy Policy&quot;) applies to the website www.talentiFix.com and any other website owned or operated by or for TalentiFi-X, LLC. (&quot;Talentifix&quot;) to which you may link from this website (collectively, the &quot;Talentifix Sites&quot;), and informs you about the type of information that may be collected and used by the Talentifix Sites. By visiting or using any of the Talentifix Sites, you consent to all collection of personal information, personal data, and other information/data (&quot;Information&quot;), as well as the uses described in this Privacy Policy.
          </p>

          {/* Section 1 */}
          <div className="mb-12">
            <h2 className="text-2xl md:text-3xl font-bold font-notch text-[#0000FF] mb-6">
              1. Collection of Information
            </h2>
            
            <div className="space-y-6">
              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-3">A. Purpose</h3>
                <p className="text-gray-700 leading-relaxed">
                  Users can access certain features of the Talentifix Sites without disclosing Information. Users may be required to register for an account in order to access certain content/portions of the Talentifix Sites.
                </p>
              </div>

              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-3">B. Information Sought During Registration</h3>
                <p className="text-gray-700 leading-relaxed">
                  The Talentifix Sites may ask you to enter, or may collect in other ways, Information including without limitation your name, phone number, email address, geographic location, age or age range, other demographic (personal) information/data, and browser history (Internet sites visited).
                </p>
              </div>

              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-3">C. Information Sought During Website Sweepstakes or Contests</h3>
                <p className="text-gray-700 leading-relaxed">
                  When the Talentifix Sites offer sweepstakes or contests, Information may be collected with the primary purpose of notifying you if you win the sweepstakes or contest, but such Information may be used for the other purposes described in this Privacy Policy.
                </p>
              </div>

              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-3">D. Automatically Collected Information</h3>
                <p className="text-gray-700 leading-relaxed">
                  Information concerning the computer hardware and software you are using when you visit the Talentifix Sites may be collected automatically. This information may include: the IP address, browser type, domain names, access times, and referring website addresses. Talentifix uses this information primarily to maintain the quality of its service and to provide general statistics about website visitors, but may use the information for any other purpose described in this Privacy Policy.
                </p>
              </div>

              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-3">E. Storage and Transfer of Personally Identifiable Information</h3>
                <p className="text-gray-700 leading-relaxed">
                  Talentifix may store and process Information in the United States of America, India, or any other country in which Talentifix or its affiliates, subsidiaries, or agents—domestic or foreign—maintain facilities. By using the Talentifix Sites, you consent to any such transfer of Information outside of the country where you reside, where you are a citizen, and/or where you access the Talentifix Site(s).
                </p>
              </div>
            </div>
          </div>

          {/* Section 2 */}
          <div className="mb-12">
            <h2 className="text-2xl md:text-3xl font-bold font-notch text-[#0000FF] mb-6">
              2. Use and Sharing of Information
            </h2>
            
            <div className="space-y-6">
              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-3">A. General Use</h3>
                <p className="text-gray-700 leading-relaxed">
                  Talentifix collects and uses Information in part to operate the web sites and provide its online and electronic services. The collection of certain Information enables Talentifix to send you any newsletter(s), mailings, offers or other matters you may request. Certain information concerning your geographical location may be used to provide regionalized information to Talentifix&apos;s customers or other third parties. When you voluntarily enter a sweepstakes or contest, Talentifix may request your email address and other Information in order to contact you in the event you are a winner of the sweepstakes or contest or for other uses. Talentifix reserves the right to share Information with its affiliates, subsidiaries and third parties for reasonable business purposes without additional permission other than the permission you have granted under the terms of this Privacy Policy.
                </p>
              </div>

              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-3">B. Service Providers</h3>
                <p className="text-gray-700 leading-relaxed">
                  Talentifix sometimes engages other persons/companies to provide services on Talentifix&apos;s behalf, such as sending newsletters, providing customer service, and performing statistical analysis of Talentifix&apos;s services. Talentifix will generally provide those entities only such Information as is needed to provide Talentifix with such services, and Talentifix will generally prohibit such entities from using such Information for other purposes, but in certain instances may do so if commercially reasonable.
                </p>
              </div>

              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-3">C. Legal Disclosure</h3>
                <p className="text-gray-700 leading-relaxed">
                  Talentifix also reserves the right to disclose Information, without notice, if required to do so by law or in the good faith belief that such action is necessary to: (a) comply with the requirements of law, the orders of a courts or agencies, and/or other legal process; (b) protect the rights or property of Talentifix or others; and/or (c) protect the personal safety of users any of the Talentifix Sites or other persons.
                </p>
              </div>

              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-3">D. Third-Party Links</h3>
                <p className="text-gray-700 leading-relaxed">
                  The Talentifix Sites sometimes provide hyper-links to third party sites. Talentifix encourages you to review the privacy statements of web sites you choose to visit via hyper-links on the Talentifix Sites so that you can understand how those web sites collect, use and share Information. Talentifix is not responsible for the content, privacy policies, acts or omissions of third-party web sites and their owners/administrators.
                </p>
              </div>

              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-3">E. Email Communications</h3>
                <p className="text-gray-700 leading-relaxed">
                  The Talentifix Sites sometimes provide links to send email messages to Talentifix Site administrators for your convenience, in which case your e-mail address may be used to reply to your inquiry or for other business purposes. For example, Talentifix may track the pages on the Talentifix Sites that you visit in part to determine which areas of the site are the most popular or of interest to you. This Information may be used to deliver customized content and advertising when behavior indicates an interested in a particular subject area, or for other commercially reasonable business purposes.
                </p>
              </div>
            </div>
          </div>

          {/* Section 3 */}
          <div className="mb-12">
            <h2 className="text-2xl md:text-3xl font-bold font-notch text-[#0000FF] mb-6">
              3. Information from Other Sources
            </h2>
            <div className="bg-gray-50 rounded-lg p-6">
              <p className="text-gray-700 leading-relaxed">
                Talentifix sometimes supplements the Information it receives with Information from other sources. Such outside Information includes such things as: (a) updated delivery and address information, including from carriers or other third parties, which Information enables Talentifix to correct its records and deliver services or purchases, or future communication, more easily; (b) account Information; (c) purchase or redemption Information; (d) page-view Information, including from some merchants with whom Talentifix operates co-branded businesses or for which Talentifix provides technical, fulfillment, advertising, or other services; (e) search term and search result Information from searches that may have been conducted through Internet search engines/features; (f) search results and links, including paid listings; and (g) credit history Information from credit bureaus, which we may use to help prevent and detect fraud and to offer certain credit or financial services or other commercially reasonable business purposes.
              </p>
            </div>
          </div>

          {/* Section 4 */}
          <div className="mb-12">
            <h2 className="text-2xl md:text-3xl font-bold font-notch text-[#0000FF] mb-6">
              4. Information Security
            </h2>
            <div className="bg-gray-50 rounded-lg p-6">
              <p className="text-gray-700 leading-relaxed">
                The Talentifix Sites may require you to use a password selected by you. Passwords shall not be shared and must be kept confidential. You are responsible for all activities that occur through the use of your password, including unauthorized use, and for promptly notifying Talentifix of any unauthorized use and any other breach of security with respect to the Talentifix Sites. Talentifix, in its sole and absolute discretion, may at any time terminate or otherwise restrict access to and use of the Talentifix Sites, including without limitation if Talentifix should suspect unauthorized use of a password or any other breach of security. If you share a computer with anyone, you should always log out of the website before leaving it to prevent access to your information from subsequent users of that computer.
              </p>
            </div>
          </div>

          {/* Section 5 */}
          <div className="mb-12">
            <h2 className="text-2xl md:text-3xl font-bold font-notch text-[#0000FF] mb-6">
              5. Use of Cookies
            </h2>
            
            <div className="space-y-6">
              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-3">A. About Cookies</h3>
                <p className="text-gray-700 leading-relaxed">
                  The Talentifix Sites use cookies to help Talentifix make your online experience more individualized. A cookie is a text file that is placed in storage on your computer. Cookies cannot be used to run programs or deliver viruses to your computer. Cookies are uniquely assigned to you, and are read by the web server in the domain that issued the cookie to you.
                </p>
              </div>

              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-3">B. Cookie Usage</h3>
                <p className="text-gray-700 leading-relaxed">
                  Cookies are used for convenience and to save you time when you again visit the Talentifix Sites. The purpose of cookies is to tell the web server that you have returned to a specific page, so that, for example, when you visit the page again your experience can be personalized. Most web browsers automatically accept cookies but give you the ability to change settings to decline cookies. Accepting cookies may permit you to be logged on the site automatically, and if you decline cookies, you may not be able to sign on automatically or experience the interactive features of the site or other sites you visit, and you may experience technical problems receiving current information from such sites if cookies are disabled.
                </p>
              </div>

              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-3">C. Remarketing</h3>
                <p className="text-gray-700 leading-relaxed">
                  Talentifix currently uses remarketing to market our sites across the web. Talentifix places a cookie on your computer via the browser and third party software accesses these cookies and may serve an ad to you through your browser for a third party site. You may opt out of this ad service on Google&apos;s opt out page.
                </p>
              </div>
            </div>
          </div>

          {/* Section 6 */}
          <div className="mb-12">
            <h2 className="text-2xl md:text-3xl font-bold font-notch text-[#0000FF] mb-6">
              6. Use of Web Beacons
            </h2>
            <div className="bg-gray-50 rounded-lg p-6">
              <p className="text-gray-700 leading-relaxed">
                Talentifix&apos;s website pages may contain electronic images known as web beacons, also referred to as single-pixel gifs, that permit Talentifix to count the number of users who have visited those pages and allow collection of other website statistics, such as the popularity of certain content, verification of system and server integrity, etc. Web beacons are not intended to give Talentifix access to your personal Information, but instead to compile aggregated statistical data concerning the use of the Talentifix Sites. Web beacons collect limited types of information which may include a cookie number, the time and date of a page view, and a description of the page on which the web beacon resides.
              </p>
            </div>
          </div>

          {/* Section 7 */}
          <div className="mb-12">
            <h2 className="text-2xl md:text-3xl font-bold font-notch text-[#0000FF] mb-6">
              7. Blogs
            </h2>
            <div className="bg-gray-50 rounded-lg p-6">
              <p className="text-gray-700 leading-relaxed">
                Any personally identifiable information or personally sensitive data that you disclose through any blogs that may be hosted on the Talentifix Sites may be collected and used by others. You should assume that any personal information you provide at any blogs on the Talentifix Sites will become public.
              </p>
            </div>
          </div>

          {/* Section 8 */}
          <div className="mb-12">
            <h2 className="text-2xl md:text-3xl font-bold font-notch text-[#0000FF] mb-6">
              8. Children
            </h2>
            <div className="bg-gray-50 rounded-lg p-6">
              <p className="text-gray-700 leading-relaxed">
                If you are under 18, you must have your parent or legal guardian access and use the Talentifix Sites for you. If you want to purchase any goods or services that may be offered at a Talentifix Site, such purchase(s) must be made by your parent or legal guardian on your behalf.
              </p>
            </div>
          </div>

          {/* Section 9 */}
          <div className="mb-12">
            <h2 className="text-2xl md:text-3xl font-bold font-notch text-[#0000FF] mb-6">
              9. Limitation of Liability and Limited Guarantee
            </h2>
            <div className="bg-gray-50 rounded-lg p-6">
              <p className="text-gray-700 leading-relaxed">
                The Talentifix Sites may contain errors or problems and are provided &quot;as is.&quot; Talentifix disclaims all warranties, expressed or implied, in connection with the Talentifix Sites, including the implied warranties of merchantability and fitness. If a Talentifix Site fails to perform in accordance with the representations made by Talentifix through its corporate offices, Talentifix will use commercially reasonable efforts to correct the failure. It is expressly agreed that your exclusive remedy, and Talentifix&apos;s aggregate liability, whether in contract, tort or otherwise, in connection with the Talentifix Sites shall not exceed one hundred dollars ($100.00). Talentifix shall in no event be responsible for any incidental, consequential or punitive damages in connection with the Talentifix Sites (including, but not limited to, lost profits, business interruption, loss of business information or other pecuniary loss) regardless of whether such liability is based on breach of contract, tort (including negligence), strict liability, breach of warranties, failure of essential purpose, or otherwise, and even if Talentifix has been advised of the possibility of such damages.
              </p>
            </div>
          </div>

          {/* Section 10 */}
          <div className="mb-12">
            <h2 className="text-2xl md:text-3xl font-bold font-notch text-[#0000FF] mb-6">
              10. Contact Information
            </h2>
            <div className="bg-gray-50 rounded-lg p-6">
              <p className="text-gray-700 leading-relaxed mb-4">
                Talentifix welcomes feedback regarding this Privacy Policy. If at any time you believe that a Talentifix Site has not adhered to this Privacy Policy, please contact Talentifix and we will use all commercially reasonable efforts to promptly investigate and correct any problems.
              </p>
              <p className="text-gray-700">
                <strong>Email:</strong>{" "}
                <a href="mailto:privacy@talentifi-x.com" className="text-[#0000FF] hover:underline">
                  privacy@talentiFi-x.com
                </a>
              </p>
            </div>
          </div>

          {/* Divider */}
          <hr className="my-12 border-gray-200" />

          {/* California Privacy Rights */}
          <div className="mb-12">
            <h2 className="text-2xl md:text-3xl font-bold font-notch text-[#0000FF] mb-6">
              California Privacy Rights and Choices
            </h2>
            <p className="text-gray-700 leading-relaxed mb-6">
              The California Consumer Privacy Act (CCPA) provides California residents with specific rights regarding their Personal Information. Your CCPA rights include the following:
            </p>

            <div className="space-y-6">
              <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-lg p-6 border-l-4 border-[#0000FF]">
                <h3 className="text-lg font-bold text-gray-900 mb-3">Right to Access</h3>
                <p className="text-gray-700 leading-relaxed mb-4">
                  You have the right to request that we disclose certain information to you about our collection and use of your Personal Information over the past 12 months, which includes:
                </p>
                <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                  <li>The categories of Personal Information we collected about you</li>
                  <li>The categories of sources for the Personal Information we collected about you</li>
                  <li>Our business or commercial purpose for collecting or selling that Personal Information</li>
                  <li>The categories of third parties with whom we share that Personal Information</li>
                  <li>The specific pieces of Personal Information we collected about you (also called a data portability request)</li>
                </ul>
              </div>

              <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-lg p-6 border-l-4 border-[#0000FF]">
                <h3 className="text-lg font-bold text-gray-900 mb-3">Right to Data Portability</h3>
                <p className="text-gray-700 leading-relaxed">
                  You have the right to request a copy of your Personal Information in a portable, readily usable format to be transmitted to another entity without hindrance.
                </p>
              </div>

              <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-lg p-6 border-l-4 border-[#0000FF]">
                <h3 className="text-lg font-bold text-gray-900 mb-3">Right to Correct Inaccurate Information</h3>
                <p className="text-gray-700 leading-relaxed">
                  You have the right to request that we correct any inaccurate Personal Information we maintain.
                </p>
              </div>

              <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-lg p-6 border-l-4 border-[#0000FF]">
                <h3 className="text-lg font-bold text-gray-900 mb-3">Right to Deletion</h3>
                <p className="text-gray-700 leading-relaxed">
                  You have the right to request that we delete any Personal Information we collected from you and retained, subject to certain exceptions.
                </p>
              </div>

              <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-lg p-6 border-l-4 border-[#0000FF]">
                <h3 className="text-lg font-bold text-gray-900 mb-3">Right to Be Free from Discrimination</h3>
                <p className="text-gray-700 leading-relaxed mb-4">
                  You have the right not to be discriminated against by us for exercising your rights under the CCPA. Unless permitted by the CCPA, we will not:
                </p>
                <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                  <li>Deny goods or services to you</li>
                  <li>Charge different prices or rates for goods or services</li>
                  <li>Provide a different level or quality of goods or services</li>
                  <li>Suggest that you will receive a different price or rate for goods or services</li>
                  <li>Retaliate against an employee, applicant for employment, or independent contractor</li>
                </ul>
              </div>
            </div>

            <div className="mt-8 bg-gray-50 rounded-lg p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-3">Verifiable Consumer Requests</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                Only you, or someone legally authorized to act on your behalf, may make a verifiable consumer request related to your Personal Information. You may only make a verifiable consumer request for access or data portability twice within a 12-month period. The verifiable consumer request must:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                <li>Provide sufficient information that allows us to reasonably verify that you are the person about whom we collected Personal Information or an authorized representative</li>
                <li>Describe your request with sufficient detail, allowing us to understand, evaluate, and respond appropriately</li>
              </ul>
            </div>

            <div className="mt-8 bg-gray-50 rounded-lg p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-3">Response Timing and Format</h3>
              <p className="text-gray-700 leading-relaxed">
                We endeavor to respond to a verifiable consumer request within forty-five (45) days of its receipt. If we require more time (up to an additional 45 days), we will inform you of the reason and extension period in writing. Any disclosures we provide will only cover the 12 months preceding the receipt of the verifiable consumer request.
              </p>
            </div>
          </div>

          {/* Divider */}
          <hr className="my-12 border-gray-200" />

          {/* EU and India Privacy Rights */}
          <div className="mb-12">
            <h2 className="text-2xl md:text-3xl font-bold font-notch text-[#0000FF] mb-6">
              European Union and India Privacy Rights
            </h2>

            <div className="space-y-8">
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">GDPR Rights (EU/EEA Users)</h3>
                <p className="text-gray-700 leading-relaxed mb-4">
                  If you are located in the European Union or European Economic Area, you have the following rights under the General Data Protection Regulation (GDPR):
                </p>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h4 className="font-bold text-gray-900 mb-2">Right to Access</h4>
                    <p className="text-gray-600 text-sm">Request confirmation of whether we process your data and obtain a copy of your personal data</p>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h4 className="font-bold text-gray-900 mb-2">Right to Rectification</h4>
                    <p className="text-gray-600 text-sm">Request correction of inaccurate or incomplete personal data</p>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h4 className="font-bold text-gray-900 mb-2">Right to Erasure</h4>
                    <p className="text-gray-600 text-sm">Request deletion of your personal data in certain circumstances</p>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h4 className="font-bold text-gray-900 mb-2">Right to Restriction</h4>
                    <p className="text-gray-600 text-sm">Request limitation of processing in specific situations</p>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h4 className="font-bold text-gray-900 mb-2">Right to Data Portability</h4>
                    <p className="text-gray-600 text-sm">Receive your data in structured, commonly used, machine-readable format</p>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h4 className="font-bold text-gray-900 mb-2">Right to Object</h4>
                    <p className="text-gray-600 text-sm">Object to processing based on legitimate interests or for direct marketing purposes</p>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h4 className="font-bold text-gray-900 mb-2">Right to Withdraw Consent</h4>
                    <p className="text-gray-600 text-sm">Withdraw consent at any time (without affecting lawfulness of prior processing)</p>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h4 className="font-bold text-gray-900 mb-2">Right to Lodge a Complaint</h4>
                    <p className="text-gray-600 text-sm">File a complaint with your local supervisory authority</p>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">India Privacy Rights</h3>
                <p className="text-gray-700 leading-relaxed mb-4">
                  If you are located in India, you have the following rights under Indian data protection laws:
                </p>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h4 className="font-bold text-gray-900 mb-2">Right to Confirmation and Access</h4>
                    <p className="text-gray-600 text-sm">Confirm whether we hold your data and access it</p>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h4 className="font-bold text-gray-900 mb-2">Right to Correction</h4>
                    <p className="text-gray-600 text-sm">Correct inaccurate or incomplete data</p>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h4 className="font-bold text-gray-900 mb-2">Right to Erasure</h4>
                    <p className="text-gray-600 text-sm">Request deletion in certain circumstances</p>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h4 className="font-bold text-gray-900 mb-2">Right to Data Portability</h4>
                    <p className="text-gray-600 text-sm">Receive data in structured format</p>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h4 className="font-bold text-gray-900 mb-2">Right to be Forgotten</h4>
                    <p className="text-gray-600 text-sm">Request erasure of data that is no longer necessary</p>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h4 className="font-bold text-gray-900 mb-2">Right to Grievance Redressal</h4>
                    <p className="text-gray-600 text-sm">File complaints with our grievance officer</p>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-lg p-6 border-l-4 border-[#00DDE2]">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Grievance Officer (India)</h3>
                <div className="text-gray-700 space-y-2">
                  <p><strong>Designation:</strong> Grievance Officer</p>
                  <p><strong>Email:</strong> <a href="mailto:privacy@talentifi-x.com" className="text-[#0000FF] hover:underline">privacy@talentiFi-x.com</a></p>
                  <p><strong>Address:</strong> 26/19 Gandhi Bazar Main Road, Basavanagudi, Bangalore 560004</p>
                </div>
                <p className="text-gray-600 text-sm mt-4">
                  The Grievance Officer will acknowledge complaints within 24 hours and resolve them within 15 days.
                </p>
              </div>
            </div>
          </div>

          {/* Legal Basis for Processing */}
          <div className="mb-12">
            <h2 className="text-2xl md:text-3xl font-bold font-notch text-[#0000FF] mb-6">
              Legal Basis for Processing (EU/India)
            </h2>
            <div className="bg-gray-50 rounded-lg p-6">
              <p className="text-gray-700 leading-relaxed mb-4">We process your personal data based on the following legal grounds:</p>
              <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                <li><strong>Consent:</strong> Where you have given explicit consent for specific purposes</li>
                <li><strong>Contract Performance:</strong> Processing necessary to perform our contract with you</li>
                <li><strong>Legal Obligation:</strong> Processing necessary to comply with our legal obligations</li>
                <li><strong>Legitimate Interests:</strong> For our legitimate business interests, provided these do not override your fundamental rights</li>
              </ul>
            </div>
          </div>

          {/* International Data Transfers */}
          <div className="mb-12">
            <h2 className="text-2xl md:text-3xl font-bold font-notch text-[#0000FF] mb-6">
              International Data Transfers
            </h2>
            <div className="bg-gray-50 rounded-lg p-6">
              <p className="text-gray-700 leading-relaxed">
                Your personal data may be transferred to and processed in the United States, India, or other countries which may have different data protection standards. For EU/EEA users, we use Standard Contractual Clauses approved by the European Commission to ensure appropriate safeguards for international transfers.
              </p>
            </div>
          </div>

          {/* Divider */}
          <hr className="my-12 border-gray-200" />

          {/* Changes to Our Privacy Policy */}
          <div className="mb-12">
            <h2 className="text-2xl md:text-3xl font-bold font-notch text-[#0000FF] mb-6">
              Changes to Our Privacy Policy
            </h2>
            <div className="bg-gray-50 rounded-lg p-6">
              <p className="text-gray-700 leading-relaxed mb-4">
                It is our policy to post any changes we make to our Privacy Policy on this page. If we make material changes to how we treat our users&apos; Personal Information, we will notify you by providing notice in advance of such change by highlighting the change on our Website and by direct notification upon login.
              </p>
              <p className="text-gray-700 leading-relaxed">
                The date the Privacy Policy was last revised is identified at the top of the page. You are responsible for ensuring we have an up-to-date, active, and deliverable email address for you and for periodically visiting our Website and this Privacy Policy to check for any changes.
              </p>
            </div>
          </div>

          {/* Contact Information */}
          <div className="mb-12">
            <h2 className="text-2xl md:text-3xl font-bold font-notch text-[#0000FF] mb-6">
              Contact Information
            </h2>
            <div className="bg-gradient-to-r from-[#0000FF]/5 to-[#00DDE2]/5 rounded-xl p-8 border border-[#0000FF]/10">
              <p className="text-gray-700 leading-relaxed mb-6">
                To ask questions or comment about this Privacy Policy and our privacy practices, contact us at:
              </p>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <span className="font-bold text-gray-900 w-24">Email:</span>
                  <a href="mailto:privacy@talentifi-x.com" className="text-[#0000FF] hover:underline">
                    privacy@talentiFi-x.com
                  </a>
                </div>
                <div className="flex items-start gap-3">
                  <span className="font-bold text-gray-900 w-24">Mail:</span>
                  <span className="text-gray-700">
                    ATTN: Compliance Manager,<br />
                    TalentiFi-X, 26/19 Gandhi Bazar Main Road,<br />
                    Basavanagudi, Bangalore 560004
                  </span>
                </div>
                <div className="flex items-start gap-3">
                  <span className="font-bold text-gray-900 w-24">EU DPO:</span>
                  <a href="mailto:privacy@talentifi-x.com" className="text-[#0000FF] hover:underline">
                    privacy@talentifi-x.com
                  </a>
                </div>
                <div className="flex items-start gap-3">
                  <span className="font-bold text-gray-900 w-24">India GO:</span>
                  <a href="mailto:privacy@talentifi-x.com" className="text-[#0000FF] hover:underline">
                    privacy@talentifi-x.com
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Final Note */}
          <div className="text-center py-8 border-t border-gray-200">
            <p className="text-gray-500 text-sm">
              This Policy is effective as of <strong>January 28, 2025</strong>
            </p>
          </div>

        </div>
      </section>
    </main>
  );
}

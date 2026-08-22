import React, { useEffect } from 'react';
import '../index.css';

function MouHeader() {
  return (
    <div className="fixed top-0 left-0 w-full h-[120px] bg-white border-b border-gray-100 z-50 flex items-center justify-between px-16 print:fixed print:top-0">
      <div className="flex items-center gap-6">
        <img src="/Partners/Fundfy.app.png" alt="Fundfy" className="h-8 w-auto object-contain" />
        </div>
      <div className="text-sm font-bold text-gray-400 uppercase tracking-widest">
        Strategic Partnership Agreement
      </div>
    </div>
  );
}

function MouFooter() {
  return (
    <div className="fixed bottom-0 left-0 w-full h-[80px] bg-white flex items-center justify-between px-16 border-t border-gray-200 z-50 print:fixed print:bottom-0">
      <div className="flex items-center gap-6">
        <span className="text-[10px] text-black/40 tracking-[0.4em] font-black uppercase whitespace-nowrap">Powered By</span>
        <div className="flex items-center gap-7 border-l border-gray-300 pl-6">
          <img src="/Partners/AWS_v2.png" className="h-8 w-auto object-contain opacity-70 grayscale" />
          <img src="https://upload.wikimedia.org/wikipedia/commons/5/51/Google_Cloud_logo.svg" className="h-4 w-auto object-contain opacity-70 grayscale" />
          <img src="https://upload.wikimedia.org/wikipedia/commons/5/51/IBM_logo.svg" className="h-5 w-auto object-contain opacity-70 grayscale" />
          <img src="/Partners/JobFinderAI.png" className="h-5 w-auto object-contain opacity-70 grayscale" />
          <img src="/Partners/MoreYeahs.png" className="h-4 w-auto object-contain opacity-70 grayscale" />
          <img src="/Partners/TingoAI.png" className="h-6 w-auto object-contain opacity-70 grayscale" />
          <span className="text-xs font-semibold text-gray-400">& 20+ Global Partners</span>
        </div>
      </div>
      <div className="text-[10px] text-gray-400 font-bold tracking-widest uppercase">
        CONFIDENTIAL & BINDING
      </div>
    </div>
  );
}

export default function MOUPDF() {
  useEffect(() => {
    document.title = 'Fundfy_Partnership_MOU';
  }, []);

  return (
    <div className="bg-gray-100 flex justify-center print:bg-white min-h-screen pb-20 print:pb-0">
      <div 
        id="mou-container"
        className="relative bg-white shadow-2xl print:shadow-none mx-auto w-[1080px] min-h-[1528px]"
      >
        <MouHeader />
        <MouFooter />

        {/* We use a table to force space at the top and bottom of EVERY printed page so the fixed header/footer don't overlap the text */}
        <table className="w-full">
          <thead>
            <tr>
              <td>
                <div className="h-[150px]"></div>
              </td>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <div className="px-24 flex flex-col pb-10">
                  
                  <div className="mb-16 text-center">
                    <h1 className="text-[56px] font-black text-slate-900 tracking-tighter leading-[1] mb-6">
                      MEMORANDUM OF UNDERSTANDING
                    </h1>
                  </div>

                  <div className="text-[16px] text-slate-700 leading-[1.8] space-y-8 text-justify">
                    
                    <p>
                      <strong>This Memorandum of Understanding</strong> ("MOU" or "Agreement") is entered into as of <strong>17th August 2026</strong>, by and between:
                    </p>

                    <p>
                      <strong>Fundfy.app</strong>  represented by <strong>Danny K</strong> (Director at Fundfy), hereinafter referred to as "Fundfy" or "First Party",
                    </p>
                    <p className="text-center font-bold">AND</p>
                    <p>
                      <strong>CodeQuesters</strong>, represented by <strong>Mehul Agarwal</strong>, hereinafter referred to as "Partner" or "Second Party".
                    </p>

                    <p className="italic">
                      (Fundfy and Partner are collectively referred to as the "Parties" and individually as a "Party".)
                    </p>

                    <h3 className="text-xl font-bold text-slate-900 mt-10 mb-4 uppercase tracking-widest border-b border-gray-200 pb-2">Recitals</h3>
                    <p>
                      <strong>WHEREAS,</strong> Fundfy is organizing the Global Talent Hunt 2026 Accelerator Program, a premier initiative designed to elevate global talent;
                    </p>
                    <p>
                      <strong>WHEREAS,</strong> the Partner possesses an extensive network and wishes to collaborate with Fundfy to promote the program and drive registrations;
                    </p>
                    <p>
                      <strong>NOW, THEREFORE,</strong> in consideration of the mutual promises and covenants contained herein, the Parties agree as follows:
                    </p>

                    <h3 className="text-xl font-bold text-slate-900 mt-12 mb-4 uppercase tracking-widest border-b border-gray-200 pb-2">Article 1: Purpose & Scope</h3>
                    <p>
                      <strong>1.1</strong> The purpose of this MOU is to establish a strategic, long-term partnership between Fundfy and the Partner.
                    </p>
                    <p>
                      <strong>1.2</strong> The Partner shall act as an official registration partner for the Global Talent Hunt 2026, utilizing their network, resources, and promotional channels to drive user registrations.
                    </p>
                    <p>
                      <strong>1.3</strong> Fundfy retains full ownership, intellectual property rights, and control over the Global Talent Hunt 2026 contest. However, this agreement signifies a long-term, collaborative partnership between both Parties that goes beyond a purely transactional basis.
                    </p>

                    <h3 className="text-xl font-bold text-slate-900 mt-12 mb-4 uppercase tracking-widest border-b border-gray-200 pb-2">Article 2: Mutual Goals & Targets</h3>
                    <p>
                      <strong>2.1</strong> Unlike traditional performance quotas, this partnership operates on a shared growth model with no strict minimum targets imposed on the Partner.
                    </p>
                    <p>
                      <strong>2.2</strong> Both Parties commit to a mutual milestone goal of generating 15,000 successful registrations.
                    </p>
                    <p>
                      <strong>2.3</strong> Fundfy commits to providing all necessary promotional materials, tracking infrastructure, and platform support to facilitate this goal.
                    </p>
                    <p>
                      <strong>2.4</strong> This partnership officially commences on 17th August 2026. Both Parties commit to working closely together on a day-to-day basis to monitor progress and drive consistent, daily results.
                    </p>
                    <p>
                      <strong>2.5</strong> <strong>Jagadeesh K</strong> shall act as the dedicated Point of Contact (POC) for the Partner. Jagadeesh K will be responsible for handling all queries, providing regular updates, and assisting with day-to-day operational requirements.
                    </p>

                    <h3 className="text-xl font-bold text-slate-900 mt-12 mb-4 uppercase tracking-widest border-b border-gray-200 pb-2">Article 3: Revenue Sharing & Compensation</h3>
                    <p>
                      <strong>3.1</strong> In consideration of the promotional efforts and successful conversions, the Partner shall receive a direct revenue share of thirty percent (30%) of the ₹100 registration fee for every completed and paid registration generated through their unique referral link.
                    </p>
                    <p>
                      <strong>3.2</strong> The Partner will be provided with a unique referral link and secure login credentials to a dedicated Partner Dashboard panel, allowing them to transparently track all registrations and commissions in real time.
                    </p>
                    <p>
                      <strong>3.3</strong> Accrued commissions shall be calculated and paid out to the Partner in full at the end of every week.
                    </p>

                    <h3 className="text-xl font-bold text-slate-900 mt-12 mb-4 uppercase tracking-widest border-b border-gray-200 pb-2">Article 4: Brand Visibility & Recognition</h3>
                    <p>
                      <strong>4.1</strong> The Partner shall be officially recognized as a core strategic driver of the Fundfy ecosystem.
                    </p>
                    <p>
                      <strong>4.2</strong> The Partner's brand, logo, and name will be featured, announced, and celebrated at every official event, webinar, and contest conducted by Fundfy.app .
                    </p>
                    <p>
                      <strong>4.3</strong> This visibility is intended to cement the Partner's status as a long-term strategic ally.
                    </p>

                    <h3 className="text-xl font-bold text-slate-900 mt-12 mb-4 uppercase tracking-widest border-b border-gray-200 pb-2">Article 5: Term & Termination</h3>
                    <p>
                      <strong>5.1</strong> This MOU shall commence on 17th August 2026 and remain in full force and effect until terminated by either Party.
                    </p>
                    <p>
                      <strong>5.2</strong> Either Party may terminate this Agreement without cause by providing thirty (30) days' written notice to the other Party.
                    </p>
                    <p>
                      <strong>5.3</strong> Upon termination, all pending weekly commissions accrued prior to the termination date shall be paid in full to the Partner.
                    </p>

                    <h3 className="text-xl font-bold text-slate-900 mt-12 mb-4 uppercase tracking-widest border-b border-gray-200 pb-2">Article 6: Confidentiality & Governing Law</h3>
                    <p>
                      <strong>6.1</strong> Both Parties agree to maintain the confidentiality of any proprietary information, business strategies, and user data shared during the course of this partnership.
                    </p>
                    <p>
                      <strong>6.2</strong> This Agreement shall be governed by and construed in accordance with the laws of the applicable jurisdiction. Any disputes shall be resolved amicably through good-faith negotiations.
                    </p>

                    <div className="mt-24 flex justify-between items-end border-t border-gray-300 pt-12" style={{ pageBreakInside: 'avoid' }}>
                      <div>
                        <p className="font-bold text-slate-900 text-lg mb-8">IN WITNESS WHEREOF,</p>
                        <div className="w-80 border-b-2 border-slate-400 mb-2"></div>
                        <p className="font-black text-slate-900 text-xl">Danny K</p>
                        <p className="text-slate-500 font-medium">Director, Fundfy.app</p>
                        <p className="text-slate-500 text-sm mt-2">Date: 17th August 2026</p>
                      </div>
                      <div>
                        <p className="font-bold text-slate-900 text-lg mb-8 text-transparent">IN WITNESS WHEREOF,</p>
                        <div className="w-80 border-b-2 border-slate-400 mb-2"></div>
                        <p className="font-black text-slate-900 text-xl">Mehul Agarwal</p>
                        <p className="text-slate-500 font-medium">CodeQuesters</p>
                        <p className="text-slate-500 text-sm mt-2">Date: 17th August 2026</p>
                      </div>
                    </div>
                    
                  </div>
                </div>
              </td>
            </tr>
          </tbody>
          <tfoot>
            <tr>
              <td>
                <div className="h-[100px]"></div>
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
}

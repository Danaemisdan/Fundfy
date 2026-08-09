const fs = require('fs');
const path = require('path');

function patchRegister() {
  const file = path.join(__dirname, 'src/pages/Register.tsx');
  let code = fs.readFileSync(file, 'utf8');

  // Add password to formData
  code = code.replace(
    `email: '',`,
    `email: '',\n    password: '',`
  );

  // Add validation
  const valTarget = `const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim() || !emailRegex.test(formData.email)) newErrors.email = 'Valid email required';`;
  const valReplacement = valTarget + `\n    if (!formData.password || formData.password.length < 6) newErrors.password = 'Min 6 characters';`;
  code = code.replace(valTarget, valReplacement);

  // Add UI field
  const uiTarget = `<InputField label="Email Address" type="email" name="email" value={formData.email} onChange={handleInputChange} error={errors.email} required placeholder="Enter email address" />`;
  const uiReplacement = uiTarget + `\n                  <InputField label="Create Password" type="password" name="password" value={formData.password} onChange={handleInputChange} error={errors.password} required placeholder="Min 6 characters" />`;
  code = code.replace(uiTarget, uiReplacement);

  // Add auth logic to handleSubmit
  const submitTarget = `setIsSubmitting(true);
    try {
      // 1. Create Order via our abstracted payment service`;
  
  const submitReplacement = `setIsSubmitting(true);
    try {
      // 0. Create Supabase Auth Account
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          data: {
            first_name: formData.firstName,
            last_name: formData.lastName,
          }
        }
      });

      if (authError && authError.message !== 'User already registered') {
        setErrors({ submit: 'Account creation failed: ' + authError.message });
        setIsSubmitting(false);
        return;
      }
      
      if (authError && authError.message === 'User already registered') {
        const { error: signInErr } = await supabase.auth.signInWithPassword({
          email: formData.email,
          password: formData.password
        });
        if (signInErr) {
          setErrors({ submit: 'Email already registered. If this is you, please ensure your password is correct, or log in first.' });
          setIsSubmitting(false);
          return;
        }
      }

      // 1. Create Order via our abstracted payment service`;
      
  code = code.replace(submitTarget, submitReplacement);

  fs.writeFileSync(file, code, 'utf8');
}

function patchRegisterSuccess() {
  const file = path.join(__dirname, 'src/pages/RegisterSuccess.tsx');
  let code = fs.readFileSync(file, 'utf8');

  const emailjsTarget = `to_email: displayState.email,
              payment_id: paymentId,`;
  const emailjsReplacement = `to_email: displayState.email,
              payment_id: paymentId,
              custom_message: "Please click on 'Go to Dashboard' on our website to see the contest timer. You'll be notified 24 hours prior to the start time.",`;
  code = code.replace(emailjsTarget, emailjsReplacement);

  fs.writeFileSync(file, code, 'utf8');
}

function patchDashboard() {
  const file = path.join(__dirname, 'src/pages/Dashboard.tsx');
  let code = fs.readFileSync(file, 'utf8');
  
  // Wait, I will write the React timer component directly inside Dashboard.tsx
  // We can add a function to calculate timer inside the component, or just a simple countdown component.
  
  const timerComponentTarget = `import { Calendar, CreditCard, ChevronRight, Trophy, Users, MousePointer2, ExternalLink } from 'lucide-react';`;
  const timerComponentReplacement = `import { Calendar, CreditCard, ChevronRight, Trophy, Users, MousePointer2, ExternalLink, Clock } from 'lucide-react';

const ContestTimer = () => {
  const [timeLeft, setTimeLeft] = React.useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  React.useEffect(() => {
    const targetDate = new Date('2026-08-20T00:00:00Z').getTime();
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate - now;
      if (distance > 0) {
        setTimeLeft({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000)
        });
      }
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="mt-4 p-4 bg-purple-50 rounded-xl border border-purple-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div className="flex items-center gap-3">
        <Clock className="w-5 h-5 text-purple-600" />
        <div>
          <p className="text-sm font-bold text-gray-900">Contest starts in</p>
          <p className="text-xs font-medium text-purple-700">You'll be notified 24 hours prior.</p>
        </div>
      </div>
      <div className="flex items-center gap-2 text-center">
        <div className="flex flex-col"><span className="text-lg font-black text-gray-900">{timeLeft.days}</span><span className="text-[9px] font-bold uppercase text-gray-500">Days</span></div>
        <span className="text-lg font-black text-gray-300 pb-3">:</span>
        <div className="flex flex-col"><span className="text-lg font-black text-gray-900">{timeLeft.hours}</span><span className="text-[9px] font-bold uppercase text-gray-500">Hrs</span></div>
        <span className="text-lg font-black text-gray-300 pb-3">:</span>
        <div className="flex flex-col"><span className="text-lg font-black text-gray-900">{timeLeft.minutes}</span><span className="text-[9px] font-bold uppercase text-gray-500">Min</span></div>
        <span className="text-lg font-black text-gray-300 pb-3">:</span>
        <div className="flex flex-col"><span className="text-lg font-black text-gray-900">{timeLeft.seconds}</span><span className="text-[9px] font-bold uppercase text-gray-500">Sec</span></div>
      </div>
    </div>
  );
};
`;

  code = code.replace(timerComponentTarget, timerComponentReplacement);

  const regRenderTarget = `                  <div key={idx} className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow group">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">`;
                    
  const regRenderReplacement = `                  <div key={idx} className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow group">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">`;

  // Actually, we can just inject <ContestTimer /> inside the card.
  
  const injectTimerTarget = `                      </div>
                    </div>
                  </div>`;
  const injectTimerReplacement = `                      </div>
                    </div>
                    <ContestTimer />
                  </div>`;
                  
  code = code.replace(new RegExp(injectTimerTarget, 'g'), injectTimerReplacement);

  fs.writeFileSync(file, code, 'utf8');
}

patchRegister();
patchRegisterSuccess();
patchDashboard();
console.log('Successfully patched files!');

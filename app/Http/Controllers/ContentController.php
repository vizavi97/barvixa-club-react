<?php


namespace App\Http\Controllers;


use App\Models\Advantage;
use App\Models\Contact;
use App\Models\Crypto;
use App\Models\Currency;
use App\Models\FAQ;
use App\Models\InfoToBy;
use App\Models\Instruction;
use App\Models\Lang;
use App\Models\Package;
use App\Models\Policy;
use App\Models\Road;
use App\Models\Transaction;
use Illuminate\Support\Collection;

class ContentController extends Controller
{
    public function advantages(){
        return Advantage::where('active', 1)->get();
    }

    public function packages(){
        return Package::where('active', 1)->get();
    }

    public function slider(){
        return InfoToBy::where('active', 1)->get();
    }

    public function roadMap(){
        return Road::where('active', 1)->orderBy('sort','ASC')->get();
    }

    public function transactions()
    {
        return Transaction::with(['currency','cryptoCurrency'])->limit(5)->orderBy('created_at','DESC')->get();
    }

    public function instructions(){
        return Instruction::where('active', 1)->orderBy('sort','ASC')->get();
    }

    public function faq(){
        return FAQ::where('active', 1)->orderBy('sort','ASC')->get();
    }

    public function policy(){
        return Policy::where('active', 1)->orderBy('sort','ASC')->get();
    }

    public function contact(){
        return Contact::where('active', 1)->orderBy('sort','ASC')->get();
    }
    public function lang(){
        return Lang::get();
    }

    public function currencies(){
        return Currency::where('active', 1)->orderBy('sort','ASC')->get();
    }

    public function crypto(){
        return Crypto::where('active', 1)->orderBy('sort','ASC')->get();
    }

}

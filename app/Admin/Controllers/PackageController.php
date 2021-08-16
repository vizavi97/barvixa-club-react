<?php

namespace App\Admin\Controllers;

use App\Classes\AdminHelper;
use App\Models\Crypto;
use App\Models\Currency;
use App\Models\Package;
use App\Http\Controllers\Controller;
use Encore\Admin\Controllers\HasResourceActions;
use Encore\Admin\Form;
use Encore\Admin\Grid;
use Encore\Admin\Layout\Content;
use Encore\Admin\Show;

class PackageController extends Controller
{
    use HasResourceActions;

    /**
     * Index interface.
     *
     * @param Content $content
     * @return Content
     */
    public function index(Content $content)
    {
        return $content
            ->header(trans('admin.index'))
            ->description(trans('admin.description'))
            ->body($this->grid());
    }

    /**
     * Show interface.
     *
     * @param mixed $id
     * @param Content $content
     * @return Content
     */
    public function show($id, Content $content)
    {
        return $content
            ->header(trans('admin.detail'))
            ->description(trans('admin.description'))
            ->body($this->detail($id));
    }

    /**
     * Edit interface.
     *
     * @param mixed $id
     * @param Content $content
     * @return Content
     */
    public function edit($id, Content $content)
    {
        return $content
            ->header(trans('admin.edit'))
            ->description(trans('admin.description'))
            ->body($this->form()->edit($id));
    }

    /**
     * Create interface.
     *
     * @param Content $content
     * @return Content
     */
    public function create(Content $content)
    {
        return $content
            ->header(trans('admin.create'))
            ->description(trans('admin.description'))
            ->body($this->form());
    }

    /**
     * Make a grid builder.
     *
     * @return Grid
     */
    protected function grid()
    {
        $grid = new Grid(new Package);

        $grid->column('id','ID');
        $grid->column('active','Активность')->switch(AdminHelper::switcherData());
        $grid->column('sort','Сортировка');
        $grid->column('money_value')->editable();
        $grid->column('crypto_value')->editable();
        $grid->column('currency')->editable('select',Currency::pluck('name','id'));
        $grid->column('crypto')->editable('select',Crypto::pluck('name','id'));

        return $grid;
    }

    /**
     * Make a show builder.
     *
     * @param mixed $id
     * @return Show
     */
    protected function detail($id)
    {
        $show = new Show(Package::findOrFail($id));

        $show->id('ID');
        $show->pay('money_value');
        $show->get('crypto_value');
        $show->created_at(trans('admin.created_at'));
        $show->updated_at(trans('admin.updated_at'));

        return $show;
    }

    /**
     * Make a form builder.
     *
     * @return Form
     */
    protected function form()
    {
        $form = new Form(new Package);

        $form->display('id');
        $form->switch('active', 'Активность')->options(AdminHelper::switcherData());
        $form->number('sort', 'Сортировка');

        $form->decimal('money_value', 'Сумма валюты');
        $form->select('currency', 'Валюта')->options(Currency::pluck('name','id'));
        $form->decimal('crypto_value', 'Сумма криптовалюты');

        $form->select('crypto', 'Криптовалюта')->options(Crypto::pluck('name','id'));

        return $form;
    }
}

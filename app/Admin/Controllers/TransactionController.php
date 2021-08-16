<?php

namespace App\Admin\Controllers;

use App\Models\Transaction;
use App\Http\Controllers\Controller;
use Encore\Admin\Controllers\HasResourceActions;
use Encore\Admin\Form;
use Encore\Admin\Grid;
use Encore\Admin\Layout\Content;
use Encore\Admin\Show;

class TransactionController extends Controller
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
        $grid = new Grid(new Transaction);

        $grid->id('ID');
        $grid->moneyType('moneyType');
        $grid->moneyValue('moneyValue');
        $grid->cryptoType('cryptoType');
        $grid->cryptoValue('cryptoValue');
        $grid->moneyEntity('moneyEntity');
        $grid->criptoEntity('criptoEntity');
        $grid->created_at(trans('admin.created_at'));
        $grid->updated_at(trans('admin.updated_at'));

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
        $show = new Show(Transaction::findOrFail($id));

        $show->id('ID');
        $show->moneyType('moneyType');
        $show->moneyValue('moneyValue');
        $show->cryptoType('cryptoType');
        $show->cryptoValue('cryptoValue');
        $show->moneyEntity('moneyEntity');
        $show->criptoEntity('criptoEntity');
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
        $form = new Form(new Transaction);

        $form->display('ID');
        $form->text('moneyType', 'moneyType');
        $form->text('moneyValue', 'moneyValue');
        $form->text('cryptoType', 'cryptoType');
        $form->text('cryptoValue', 'cryptoValue');
        $form->text('moneyEntity', 'moneyEntity');
        $form->text('criptoEntity', 'criptoEntity');
        $form->display(trans('admin.created_at'));
        $form->display(trans('admin.updated_at'));

        return $form;
    }
}
